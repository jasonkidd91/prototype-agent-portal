import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ValidatorFn } from '@angular/forms';
import { Constant } from '../constant';
import { CustomValidator } from '../validators/custom-validator';

@Injectable({
  providedIn: 'root'
})
export class FormGroupService {
  constructor() { }

  // normalizeValidators(val: ValidatorFn | ValidatorFn[] | null): ValidatorFn[] {
  //   if (val === null) return [];
  //   if (Array.isArray(val)) return val;
  //   return [val];
  // }

  private setValueToForm(form: FormGroup, value: any) {
    form.patchValue(value);
    return form;
  }

  get commonForm() {
    return new FormGroup({
      code: new FormControl(null, [Validators.required]),
      name: new FormControl(null),
      version: new FormControl(null)
    }, [Validators.required]);
  }

  get commonApplicationForm() {
    return new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null),
      version: new FormControl(null)
    }, [Validators.required]);
  }

  get commonFormWithDisable() {
    return new FormGroup({
      code: new FormControl({ value: null, disabled: true }, [Validators.required]),
      name: new FormControl(null)
    }, [Validators.required]);
  }

  get nameForm() {
    return new FormGroup({
      full: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      display: new FormControl(null, [Validators.required, Validators.maxLength(100)])
    }, [Validators.required]);
  }

  get emailForm() {
    return new FormGroup({
      id: new FormControl(null),
      emailAddress: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(255)]),
      emailType: this.setValueToForm(this.commonForm, { code: Constant.DEFAULT_VALUE.EMAIL.TYPE })
    }, [Validators.required]);
  }

  get emailFormArray() {
    return new FormArray([this.emailForm], [Validators.required, Validators.minLength(1)]);
  }

  get occupationForm() {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.maxLength(255)]),
      companyName: new FormControl(null, [Validators.maxLength(255)])
    }, [Validators.required]);
  }

  get occupationFormArray() { return new FormArray([this.occupationForm], [Validators.required, Validators.minLength(1)]); }

  get phoneNumberForm() {
    return new FormGroup({
      id: new FormControl(null),
      phoneNumberType: this.setValueToForm(this.commonForm, { code: Constant.DEFAULT_VALUE.PHONE_NUMBER.TYPE }),
      country: this.setValueToForm(this.commonFormWithDisable, { code: Constant.DEFAULT_VALUE.COUNTRY.CODE }),
      phoneNumber: new FormControl(null, [Validators.pattern(Constant.REGEX.PATTERN.NUMBER_ONLY), Validators.minLength(9), Validators.maxLength(15)])
    }, [Validators.required]);
  }

  get phoneNumberFormArray() { return new FormArray([this.phoneNumberForm], [Validators.required, Validators.minLength(1)]); }

  get passwordForm() {
    return new FormGroup({
      new: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirm: new FormControl(null)
    }, { validators: [CustomValidator.confirmPassword('new', 'confirm')] });
  }

  get stateForm() {
    return new FormGroup({
      code: new FormControl(null),
      country: this.setValueToForm(this.commonFormWithDisable, { code: Constant.DEFAULT_VALUE.COUNTRY.CODE })
    }, [Validators.required]);
  }

  get addressForm() {
    return new FormGroup({
      id: new FormControl(null),
      addressType: this.setValueToForm(this.commonForm, { code: Constant.DEFAULT_VALUE.ADDRESS.TYPE }),
      line1: new FormControl(null, [Validators.maxLength(100)]),
      postalCode: new FormControl(null, [Validators.maxLength(5), Validators.minLength(5)]),
      cityName: new FormControl(null, [Validators.maxLength(100)]),
      state: this.stateForm
    }, [Validators.required]);
  }

  get addressFormArray() { return new FormArray([this.addressForm], [Validators.required, Validators.minLength(1)]); }

  get peopleForm() {
    return new FormGroup({
      id: new FormControl(null),
      name: this.nameForm,
      gender: this.setValueToForm(this.commonForm, { code: Constant.DEFAULT_VALUE.GENDER.CODE }),
      idNo: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      occupations: this.occupationFormArray,
      phoneNumbers: this.phoneNumberFormArray,
      emails: this.emailFormArray,
      addresses: this.addressFormArray
    }, [Validators.required]);
  }

  get peopleInsertForm() {
    let form = this.peopleForm;
    form.addControl('password', this.passwordForm);
    form.addControl('agreeTNC', new FormControl(false, [Validators.requiredTrue]));
    return form;
  }

  get peopleEditForm() {
    let form = this.peopleForm;
    let emailForm = form.get('emails').get('0') as FormGroup;
    emailForm.get('emailAddress').disable();
    form.removeControl('id');
    form.addControl('id', new FormControl(null, [Validators.required]));
    form.addControl('version', new FormControl(null, [Validators.required, Validators.min(1)]));
    return form;
  }

  get loanApplicationDocumentForm() {
    return new FormGroup({
      id: new FormControl(null),
      url: new FormControl(null, [Validators.required]),
      fileName: new FormControl(null)
    });
  }

  get loanApplicationAddressForm() {
    return new FormGroup({
      line1: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      postalCode: new FormControl(null, [Validators.required, Validators.pattern(Constant.REGEX.PATTERN.POSTAL_CODE)]),
      cityName: new FormControl(null, [Validators.maxLength(100)]),
      state: this.commonForm,
      country: this.setValueToForm(this.commonFormWithDisable, Constant.DEFAULT_VALUE.COUNTRY.CODE)
    });
  }

  get loanApplicationForm() {
    return new FormGroup({
      id: new FormControl(null, [Validators.required]),
      type: this.commonForm,
      amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      duration: new FormGroup({
        year: new FormControl(null, [Validators.min(1)]),
        month: new FormControl(null, [Validators.min(1)])
      }, CustomValidator.eitherOr('year', 'month')/*, [CustomValidator.eitherOr('year', 'month')]*/),
      emailAddress: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(255)]),
      gender: this.setValueToForm(this.commonForm, { code: Constant.DEFAULT_VALUE.GENDER.CODE }),
      applicantName: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      idNo: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(Constant.REGEX.PATTERN.PHONE_NUMBER), Validators.minLength(9), Validators.maxLength(15)]),
      businessType: this.setValueToForm(this.commonForm, { code: Constant.DEFAULT_VALUE.BUSINESS.TYPE }),
      occupation: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      companyName: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      annualIncome: new FormControl(null, [Validators.required, Validators.min(1)]),
      haveUnclearLoan: new FormControl(false),
      notes: new FormControl(null, [Validators.maxLength(500)]),
      documents: new FormArray([]),
      residentialAddress: this.loanApplicationAddressForm,
      sameAddress: new FormControl(false),
      mailingAddress: this.loanApplicationAddressForm,
      loanProviderType: this.setValueToForm(this.commonForm, { code: Constant.DEFAULT_VALUE.LOAN_PROVIDER.TYPE }),
      // bankString: new FormControl(null),
      // banks: new FormArray([]),
      banks: new FormControl(null),
      agree: new FormControl(false, [Validators.requiredTrue])
    }, [CustomValidator.dependFieldValue('banks', { field: 'loanProviderType.code', value: 'BANK' })]);
  }

  get translationForm() {
    return new FormGroup({
      id: new FormGroup({
        recordId: new FormControl(null),
        languageCode: new FormControl(null, [Validators.requiredTrue]),
      }),
      name: new FormControl(null, [Validators.requiredTrue, Validators.maxLength(255)]),
      notes: new FormControl(null, [Validators.maxLength(500)]),
      termAndCondition: new FormControl(null, [Validators.maxLength(500)]),
    });
  }

  get bankForm() {
    return new FormGroup({
      code: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      name: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      active: new FormControl(true),
      badgeImageUrl: new FormControl(null),
      onlineBankingUrl: new FormControl(null, [Validators.maxLength(500)]),
    });
  }

  get packageForm() {
    let form = new FormGroup({
      id: new FormControl(null),
      translations: new FormArray([this.translationForm], [Validators.required]),
      active: new FormControl(true),
      startAt: new FormControl(null),
      endAt: new FormControl(null),
      packageDetails: new FormArray([]),
      type: this.commonForm,
      interestRate: new FormControl(null, [Validators.required, Validators.pattern(Constant.REGEX.PATTERN.NUMBER_ONLY)]),
      loanAmount: new FormControl(null, [Validators.required, Validators.pattern(Constant.REGEX.PATTERN.NUMBER_ONLY)]),
      duration: new FormGroup({
        year: new FormControl(null, [Validators.required, Validators.pattern(Constant.REGEX.PATTERN.NUMBER_ONLY)])
      }),
      bestRate: new FormControl(false),
      bank: this.bankForm
    });
    this.setValueToForm(form.get('translations').get('0').get('id') as FormGroup, { languageCode: Constant.DEFAULT_VALUE.LANGUAGE_CODE });
    return form;
  }

  get packageDetailForm() {
    return new FormGroup({
      id: new FormControl(null),
      section: this.commonForm,
      seq: new FormControl(null, [Validators.required, Validators.pattern(Constant.REGEX.PATTERN.NUMBER_ONLY)]),
      details: new FormArray([]),
    });
  }

  get packageDetailListForm() {
    return new FormGroup({
      id: new FormControl(null),
      seq: new FormControl(null, [Validators.required, Validators.pattern(Constant.REGEX.PATTERN.NUMBER_ONLY)]),
      name: new FormControl(null, [Validators.requiredTrue, Validators.maxLength(255)]),
    });
  }
  
}