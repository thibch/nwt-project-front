import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {

  /**
   * Validator to check if email match email regex
   *
   * @param control {AbstractControl} control to check
   * @return {ValidationErrors|null}
   */
  static email(control: AbstractControl): ValidationErrors | null {
    /// Checking password matching RFC5322 regex (source: https://emailregex.com/)
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(control.value) ? null : {
      regex: true
    };
  }

  /**
   * Validator to check if password matching a regex
   *
   * @param control {AbstractControl} control to check
   * @return {ValidationErrors|null}
   */
  static password(control: AbstractControl): ValidationErrors | null {
    /// Checking password matching regex (source: https://regexr.com/3bfsi)
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(control.value) ? null : {
      regex: true
    }
  }

  /**
   * Password validators to check if two password are identicals
   *
   * @param password {string} first password to check
   * @param passwordConfirmed {string} second password to check
   * @return {ValidatorFn|null}
   */
  static passwordDif(password: string, passwordConfirmed: string): ValidatorFn | null {
    return (controls: AbstractControl) => {
      // Getting the two password
      const control = controls.get(password);
      const checkControl = controls.get(passwordConfirmed);

      // Check if password doesn't have any erors
      if (checkControl?.errors && !checkControl.errors.matchPasswords) {
        return null;
      }

      // If password values are different, throw error
      if (control?.value !== checkControl?.value) {
        controls.get(passwordConfirmed)?.setErrors({matchPasswords: true});
        return {matchPasswords: true};
      } else {
        return null;
      }
    };
  }

}
