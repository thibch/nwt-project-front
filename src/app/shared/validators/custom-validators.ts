import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {

  static email(control: AbstractControl): ValidationErrors | null {
    /// Checking password matching RFC5322 regex (source: https://emailregex.com/)
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(control.value) ? null : {
      regex: true
    };
  }

  static password(control: AbstractControl): ValidationErrors | null {
    /// Checking password matching regex (source: https://regexr.com/3bfsi)
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(control.value) ? null : {
      regex: true
    }
  }



  static passwordDif(password: string, passwordConfirmed: string): ValidatorFn | null {
    return (controls: AbstractControl) => {
      const control = controls.get(password);
      const checkControl = controls.get(passwordConfirmed);

      if (checkControl?.errors && !checkControl.errors.matchPasswords) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(passwordConfirmed)?.setErrors({ matchPasswords: true });
        return { matchPasswords: true };
      } else {
        return null;
      }
    };
  }

}
