import { Component, OnInit } from '@angular/core';
import { ServerApiService } from 'src/app/services/server-api.service';
import { FormGroupService } from 'src/app/services/form-group.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ComponentService } from 'src/app/services/component.service';
import { BaseClass } from 'src/app/utils/base-class';
import { Observable } from 'rxjs';
import { State } from 'src/app/models/state';
import { TranslateService } from '@ngx-translate/core';
import { People } from 'src/app/models/people';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends BaseClass implements OnInit {
  form: FormGroup;
  $state: Observable<Array<State>>;
  isSubmitted: boolean = false;

  constructor(
    private as: ServerApiService,
    private fs: FormGroupService,
    private cs: ComponentService,
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
    this.cs.showLoading();
    this.form = this.fs.peopleEditForm;
    this.addressLineOnChange();
    this.updateForm();
    this.$state = this.as.public.state.getAll();

    this.as.people.getMe().subscribe(data => {
      this.form.patchValue(data);
      this.cs.hideLoading();
    }, err => {
      console.log(err);
      this.cs.toastError(err);
      this.cs.hideLoading();
    });
  }

  saveAndUpdate(event?: Event) {
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
          this.as.custom.people.selfSaveAndUpdate(people).subscribe(value => {
            this.form.patchValue(value);
            this.isSubmitted = false;
            this.cs.hideLoading();
          }, err => {
            console.log(err);
            this.cs.toastError(err);
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

  conditionalRequired(fc: FormControl) {
    let value = fc.value as string;
    return this.notEmptyString(value);
  }
}