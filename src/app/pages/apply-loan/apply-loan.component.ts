import { Component, OnInit, ViewEncapsulation, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';
import { PackageDetailsComponent } from '../package-details/package-details.component';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ServerApiService } from 'src/app/services/server-api.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LoanType } from 'src/app/models/loan-type';
import { PaymentTerm } from 'src/app/models/payment-term';
import { Constant } from 'src/app/constant';
import { FormGroupService } from 'src/app/services/form-group.service';
import { FormGroup, FormArray, ValidationErrors } from '@angular/forms';
import { Duration } from 'src/app/models/duration';
import { BaseClass } from 'src/app/utils/base-class';
import { BusinessType } from 'src/app/models/business-type';
import { LoanProviderType } from 'src/app/models/loan-provider-type';
import { People } from 'src/app/models/people';
import { UtilityService } from 'src/app/services/utility.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Bank } from 'src/app/models/bank';
import { State } from 'src/app/models/state';
import { LoanDocument } from 'src/app/models/loan-document';
import { Loan } from 'src/app/models/loan';
import { Packages } from 'src/app/models/packages';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApplyLoanComponent extends BaseClass implements OnInit, OnDestroy {
  public subscription: Subscription = new Subscription();
  public package: Packages;
  public agreed: boolean = false;
  public party: string;
  loanTypes: Array<LoanType>;
  paymentTerms: Array<PaymentTerm>;
  businessTypes: Array<BusinessType>;
  loanProviderTypes: Array<LoanProviderType>;
  states: Array<State>;
  banks: Array<Bank>;
  people: People;
  form: FormGroup;
  showDurationForm = false;
  isSubmitted = false;
  @ViewChild('fileUploadInput') fileUploadInput: ElementRef;
  compareBankFn: ((a: Bank, b: Bank) => boolean) | null = this.compareBankByValue;
  private isRemovePackage: boolean = false;
  private languageSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cs: ComponentService,
    private as: ServerApiService,
    private ts: TranslateService,
    private fs: FormGroupService,
    private util: UtilityService,
    private fus: FileUploadService
  ) {
    super();
    const subscription = this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ).subscribe(event => {
      if (event) {
        console.log('[ApplyLoanComponent]: Navigation Subscription')
        this.initialize();
      }
    });
    this.subscription.add(subscription);

    this.languageSubscription = this.ts.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('here');
      this.ngOnInit();
    });

    this.form = this.fs.loanApplicationForm;
    this.form.patchValue({
      id: this.util.randomString
    });
  }

  compareBankByValue(a: Bank, b: Bank) {
    return a && b && a.code === b.code;
  }

  async ngOnInit() {
    this.loanTypes = null;
    this.paymentTerms = null;
    this.cs.showLoading();

    // this.route.paramMap.subscribe(data => JSON.parse(data.get('packages')));
    await forkJoin(this.as.public.loanType.getAll(), this.as.public.paymentTerm.getAll(), this.as.public.businessType.getAll(), this.as.public.loanProviderType.getAll(), this.as.people.getMe(), this.as.public.state.getAll(), this.as.public.bank.getAll()).toPromise().then(([loanTypes, paymentTerms, businessTypes, loanProviderTypes, people, states, banks]) => {
      this.loanTypes = loanTypes;
      this.paymentTerms = paymentTerms;
      this.businessTypes = businessTypes;
      this.loanProviderTypes = loanProviderTypes;
      this.people = people;
      this.states = states;
      this.banks = banks;

      if (people.occupations[0]) {
        this.form.patchValue({
          businessType: {
            code: people.occupations[0].selfEmployed ? 'SELF_EMPLOY' : 'EMPLOYEE'
          },
          occupation: people.occupations[0].name,
          companyName: people.occupations[0].companyName,
          annualIncome: people.occupations[0].monthlyIncome ? Number(people.occupations[0].monthlyIncome) * 12 : null
        });
      }

      if (people.phoneNumbers[0]) {
        this.form.patchValue({
          phoneNumber: people.phoneNumbers[0].value
        });
      }

      if (people.addresses[0]) {
        this.form.patchValue({
          residentialAddress: {
            line1: people.addresses[0].line1,
            postalCode: people.addresses[0].postalCode,
            cityName: people.addresses[0].cityName,
            state: people.addresses[0].state,
            country: people.addresses[0].state.country
          },
          mailingAddress: {
            line1: people.addresses[0].line1,
            postalCode: people.addresses[0].postalCode,
            cityName: people.addresses[0].cityName,
            state: people.addresses[0].state,
            country: people.addresses[0].state.country
          }
        });
      }

      if (people.emails[0]) {
        this.form.patchValue({
          emailAddress: people.emails[0].emailAddress
        });
      }

      this.form.patchValue({
        gender: people.gender,
        applicantName: people.name.full,
        idNo: people.idNo
      });
      const other = new PaymentTerm(Constant.DEFAULT_VALUE.OTHER, this.ts.instant('common.drop_down.other'), { year: null, month: null });
      this.paymentTerms.push(other);

      if (this.form.value.businessType.code) {
        const obj = this.businessTypes.find(x => x.code === this.form.value.businessType.code);
        this.form.get('businessType').patchValue({
          name: obj.name,
          version: obj.version
        });
      }

      if (this.package) {
        const packageForm = this.fs.commonApplicationForm;
        packageForm.patchValue(this.package);
        this.form.addControl('packages', packageForm);
        this.disableFormControl('type', this.package.type);
        this.disableFormControl('amount', this.package.loanAmount);
        this.disableFormControl('duration', this.package.duration);
        if (this.package.bank) {
          this.disableFormControl('loanProviderType.code', Constant.VALUE.BANK);
          let arr = [];
          arr.push(this.package.bank);
          this.disableFormControl('banks', arr);
        }
      }

      this.form.get('sameAddress').valueChanges.subscribe((value: boolean) => {
        if (value) {
          this.form.get('mailingAddress').disable();
          this.form.get('mailingAddress').patchValue(this.form.get('residentialAddress').value);
        } else {
          this.form.get('mailingAddress').enable();
          this.form.get('mailingAddress.country').disable();
        }
      });      

      this.form.get('type.code').valueChanges.subscribe(value => {
        const obj = this.loanTypes.find(x => x.code === value);
        this.form.get('type').patchValue({
          name: obj.name,
          version: obj.version
        });
      });

      this.form.get('residentialAddress.state.code').valueChanges.subscribe(value => {
        const obj = this.states.find(x => x.code === value);
        this.form.get('residentialAddress.state').patchValue({
          name: obj.name,
          version: obj.version
        });
      });

      this.form.get('mailingAddress.state.code').valueChanges.subscribe(value => {
        const obj = this.states.find(x => x.code === value);
        this.form.get('mailingAddress.state').patchValue({
          name: obj.name,
          version: obj.version
        });
      });

      this.form.get('businessType.code').valueChanges.subscribe(value => {
        const obj = this.businessTypes.find(x => x.code === value);
        this.form.get('businessType').patchValue({
          name: obj.name,
          version: obj.version
        });
      });
      this.cs.hideLoading();
    }).catch(err => {
      this.cs.hideLoading();
      this.cs.toastError(err);
    });
  }

  private disableFormControl(name: string, value?: any) {
    this.form.get(name).disable();
    if (value) this.form.get(name).patchValue(value);
  }

  ngOnDestroy() {
    console.log('[ApplyLoanComponent]: Destroying Subscription')
    this.subscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

  initialize() {
    const packages = JSON.parse(this.route.snapshot.paramMap.get('packages')) as Packages;
    if (packages) {
      this.package = packages;
    } else {
      this.package = null;

      if (this.isRemovePackage) {
        window.location.reload();
      }
    }
  }

  uploadFile(ev: any) {
    if (!ev.target.files || ev.target.files.length == 0) return;
    this.asyncUploadFIle(Array.from(ev.target.files));
  }

  private async asyncUploadFIle(arr: Array<File>) {
    this.cs.showLoading();
    for (let i = 0; i < arr.length; i++) {
      await this.fus.uploadLoanApplicationDocument(this.form.value.id, arr[i]).then((file: any) => {
        const documentForm = this.fs.loanApplicationDocumentForm;
        documentForm.patchValue({
          url: file.url,
          fileName: arr[i].name
        });
        this.documentFormArray.push(documentForm);
      });
    }
    this.fileUploadInput.nativeElement.value = '';
    this.cs.hideLoading();
  }

  packageDetails() {
    this.cs.openModal(PackageDetailsComponent, { data: this.package });
  }

  deselectPackage() {
    this.cs.confirm({
      title: 'Deselect Package',
      message: 'Do you sure you want to deselect this package?'
    }).subscribe(res => {
      if (res) {
        this.isRemovePackage = true;
        this.router.navigate(['../apply-loan']);
      }
    });
  }

  viewPackages() {
    this.router.navigate(['../packages']);
  }

  removeBank(index: number) {
    let arr = this.form.value.banks as Array<Bank>;
    arr.splice(index, 1);
    this.form.patchValue({
      banks: arr
    });
  }

  submitForm() {
    this.cs.confirm({
      title: this.ts.instant('form.alert.title.submit_loan_request'),
      message: this.ts.instant('form.alert.message.submmit_loan_request')
    }).subscribe(res => {
      if (res) {
        this.cs.showLoading();
        this.isSubmitted = true;
        let loan = this.form.getRawValue() as Loan;
        let year = loan.duration.year ? loan.duration.year : 0;
        let month = loan.duration.month ? loan.duration.month : 0;
        year += Math.floor(month / 12);
        month = month % 12;
        loan.duration = {
          month: month === 0 ? null : month,
          year: year === 0 ? null : year
        };

        this.as.loan.create(loan).subscribe(() => {
          this.cs.hideLoading();
          this.isSubmitted = false;
          this.form = this.fs.loanApplicationForm;
          this.cs.alert({
            title: this.ts.instant('form.alert.title.submit_success'),
            message: this.ts.instant('form.alert.message.submit_success')
          }).subscribe(() => {
            this.router.navigate(['']);
          });
        }, err => {
          this.cs.hideLoading();
          this.isSubmitted = false;
          this.cs.toastError(err);
        });
      }
    });
  }

  onPaymentTermChange(value: Duration) {
    if (!value.month && !value.year) {
      this.showDurationForm = true;
      this.form.get('duration.year').reset();
      this.form.get('duration.month').reset();
    } else {
      this.showDurationForm = false;
      this.form.patchValue({
        duration: value
      });
    }
  }

  private get documentFormArray() {
    return this.form.get('documents') as FormArray;
  }

  get banksIsValidFormArray() {
    return this.form.value.banks instanceof Array && this.form.value.banks.length > 0;
  }

  removeFile(index: number) {
    this.cs.showLoading();
    const file = this.documentFormArray.at(index).value as LoanDocument;
    this.fus.removefileByUrl(file.url).then(() => {
      this.cs.hideLoading();
      this.documentFormArray.removeAt(index);
    }, err => {
      console.log(err);
    });
  }

  get packageName(): string {
    let bankName = this.package.bank.name;
    let packageName = this.package.name;

    if (bankName) {
      let openBrac = this.ts.instant('common.label.open_bracket');
      let closeBrac = this.ts.instant('common.label.close_bracket');
      packageName = packageName.concat(openBrac, bankName, closeBrac);
    }

    return packageName;
  }
}