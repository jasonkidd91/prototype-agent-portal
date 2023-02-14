import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroupService } from 'src/app/services/form-group.service';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ServerApiService } from 'src/app/services/server-api.service';
import { State } from 'src/app/models/state';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { People } from 'src/app/models/people';
import { Constant } from 'src/app/constant';
import { BaseClass } from 'src/app/utils/base-class';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent extends BaseClass implements OnInit {
  form: FormGroup;
  $state: Observable<Array<State>>;
  isSubmitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cs: ComponentService,
    private fs: FormGroupService,
    private as: ServerApiService,
    private ts: TranslateService
  ) {
    super();
  }

  private addressLineOnChange() {
    let addressForm = this.form.get('addresses.0') as FormGroup;
    let line1 = addressForm.get('line1') as FormControl;
    let postalCode = addressForm.get('postalCode') as FormControl;
    let cityName = addressForm.get('cityName') as FormControl;
    let stateCode = addressForm.get('state.code') as FormControl;

    line1.valueChanges.subscribe((value: string) => {
      if (super.notEmptyString(value)) {
        postalCode.enable();
        cityName.enable();
        stateCode.enable();
      } else {
        addressForm.patchValue({
          postalCode: null,
          cityName: null,
          state: {
            code: null
          }
        });
        postalCode.disable();
        cityName.disable();
        stateCode.disable();
      }
    });
  }

  private updateForm() {
    let addressForm = this.form.get('addresses.0') as FormGroup;
    let postalCode = addressForm.get('postalCode') as FormControl;
    let cityName = addressForm.get('cityName') as FormControl;
    let stateCode = addressForm.get('state.code') as FormControl;

    postalCode.disable();
    cityName.disable();
    stateCode.disable();
  }

  ngOnInit() {
    this.form = this.fs.peopleInsertForm;
    this.addressLineOnChange();
    this.updateForm();
    this.$state = this.as.public.state.getAll();
  }

  signUp(event?: Event) {
    event.preventDefault();
    this.isSubmitted = true;
    if (this.form.valid) {
      this.cs.confirm({
        title: this.ts.instant('common.alert.confirm.title'),
        message: this.ts.instant('common.alert.confirm.message'),
        labelNo: this.ts.instant('common.alert.confirm.button.no'),
        labelYes: this.ts.instant('common.alert.confirm.button.yes')
      }).subscribe(res => {
        if (res) {
          this.cs.showLoading();
          let people = new People((this.form.getRawValue() as People));

          this.authService.signUpWithEmail(people.emails[0].emailAddress, people.password.confirm).then(() => {
            this.authService.signInWithEmail(people.emails[0].emailAddress, people.password.confirm).then(() => {
              this.as.custom.people.create(people).subscribe(() => {
                this.isSubmitted = false;
                this.authService.sendVerificationEmail();
                this.cs.hideLoading();
                this.router.navigate(['../verify-email']);
              }, err => {
                console.log(err);
                this.isSubmitted = false;
                this.cs.toastError(err);
                this.cs.hideLoading();
              });
            }).catch(err => {
              console.log(err);
              this.cs.toastError(err)
              this.cs.hideLoading();
            });
          }, err => {
            if (err.code) {
              if (err.code.toLowerCase() == Constant.ERROR_CODE.FIREBASE.AUTH.EMAIL_IN_USE.toLowerCase()) {
                this.emailAddressFormControl.setErrors({ 'in_use': true });
                this.cs.toastError(this.ts.instant('validation.message.email_in_use'));
              }
            } else {
              this.cs.toastError(err);
            }

            this.isSubmitted = false;
            this.cs.hideLoading();
          });
        } else {
          this.isSubmitted = false;
        }
      });
    } else {
      this.isSubmitted = false;
    }
  }

  private get emailForm() {
    return (this.form.controls['emails'] as FormArray).controls[0] as FormGroup;
  }

  get emailAddressFormControl() {
    return this.emailForm.controls['emailAddress'] as FormControl;
  }

  private get phoneNumberForm() {
    return (this.form.controls['phoneNumbers'] as FormArray).controls[0] as FormGroup;
  }

  get phoneNumberFormControl() {
    return this.phoneNumberForm.controls['phoneNumber'] as FormControl;
  }

  private get passwordForm() {
    return this.form.controls['password'] as FormGroup;
  }

  get newPassword() {
    return this.passwordForm.controls['new'] as FormControl;
  }

  get confirmPassword() {
    return this.passwordForm.controls['confirm'] as FormControl;
  }

  conditionalRequired(fc: FormControl) {
    let value = fc.value as string;
    return this.notEmptyString(value);
  }
}