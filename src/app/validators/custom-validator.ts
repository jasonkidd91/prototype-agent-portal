import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export class CustomValidator {
    private static isEmptyObj(obj: {}) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    static confirmPassword(controlName: string, matchingControlName: string): ValidatorFn {
        return (formGroup: FormGroup): ValidationErrors => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.matchingPassword) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ matchingPassword: true });
            } else {
                const errors = matchingControl.errors;
                if (errors) {
                    delete errors['matchingPassword'];
                    matchingControl.setErrors(errors);
                }
            }

            return;
        };
    }

    static eitherOr(...fields: Array<string>): ValidatorFn {
        return (formGroup: FormGroup): ValidationErrors => {
            for (const field of fields) {
                const fieldControl = formGroup.get(field);

                if (fieldControl.errors && !fieldControl.errors.eitherOr) {
                    return;
                }

                if (fieldControl.value) {
                    fields.forEach(innerField => {
                        const inner = formGroup.get(innerField);
                        let errors = inner.errors;


                        if (errors) {
                            delete errors['eitherOr'];
                            if (this.isEmptyObj(errors)) {
                                errors = null;
                            }
                            inner.setErrors(errors);
                        }
                    });

                    return;
                }
            }

            fields.forEach(field => {
                const fieldControl = formGroup.get(field);
                const errors = fieldControl.errors;

                if (!errors) fieldControl.setErrors({ eitherOr: true });
            });

            return;
        };
    }

    static dependFieldValue(field: string, ...dependentObjects: Array<{ field: string, value: string }>): ValidatorFn {
        return (formGroup: FormGroup): ValidationErrors => {
            const outerFieldControl = formGroup.get(field);
            let errors = outerFieldControl.errors;

            if (errors && !errors.dependFieldValue) return;

            for (const obj of dependentObjects) {
                const fieldControl = formGroup.get(obj.field);

                if ((fieldControl.value !== obj.value) || (fieldControl.value === obj.value && outerFieldControl.value instanceof Array && outerFieldControl.value.length > 0)) {
                    if (errors) {
                        delete errors['dependFieldValue'];
                        outerFieldControl.setErrors(errors);
                    }
                } else {
                    outerFieldControl.setErrors({ dependFieldValue: true });
                    break;
                }
            }

            return;
        };
    }
}