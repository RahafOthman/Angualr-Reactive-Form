import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const NameValidator:ValidatorFn =(control: AbstractControl)
: ValidationErrors | null => {
  const firstNameControl = control.get('FirstName');
  const lastNameControl = control.get('LastName');
  return  firstNameControl?.value?.trim() === lastNameControl?.value?.trim() ? { NameError : true} : null ; 
}

