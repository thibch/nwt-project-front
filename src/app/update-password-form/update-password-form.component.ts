import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../shared/validators/custom-validators";

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.css']
})
export class UpdatePasswordFormComponent implements OnInit {

  /**
   * Constructor of the update password component
   *
   * @param _dialogRef {MatDialogRef<LoginComponent>} reference of the parent dialog
   * @param _router {Router} router to make redirections
   * @param _data {{ error: boolean, user: User }} date provided by the parent component, error: true if an error need to be displayed on the form, user: user to update
   */
  constructor(private _dialogRef: MatDialogRef<LoginComponent>, private _router: Router, @Inject(MAT_DIALOG_DATA) private _data: { error: boolean, user: User }) {
    this._hide = true;
    this._error = _data.error;
    this._user = _data.user;
    this._updatePasswordForm = this._buildPasswordUpdateForm()
  }

  /// Boolean to know if the password need to be hide or not
  private _hide: boolean;

  /**
   * Getter of the hide boolean
   *
   * @return {boolean} true if the password need to be hide, false either
   */
  get hide(): boolean {
    return this._hide;
  }

  /**
   * Setter of the hide boolean
   *
   * @param value {boolean} true if the password need to be hide, false either
   */
  set hide(value: boolean) {
    this._hide = value;
  }

  /// Boolean to know if an error need to be printed
  private _error: boolean;

  /**
   * Getter of the error boolean
   *
   * @return {boolean} true if an error need to be displayed, false either
   */
  get error(): boolean {
    return this._error;
  }

  /// User currently updating him password
  private _user: User;

  /**
   * Getter of the user currently changing is password
   *
   * @return {User}
   */
  get user(): User {
    return this._user;
  }

  /// FormGroup to display to update password
  private _updatePasswordForm: FormGroup;

  /**
   * Getter of the password form
   *
   * @return {FormGroup}
   */
  get updatePasswordForm(): FormGroup {
    return this._updatePasswordForm;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
  }

  /**
   * Close the popup if the user cancel the password updating
   */
  redirectBack() {
    // Close the dialog and redirect back to home
    this._dialogRef.close();
    this._router.navigate(['/home'])
  }

  /**
   * Close the popup and give parent the user updated
   *
   * @param user {User} updated user
   */
  changePass(user: User) {
    // Change password and close popup
    this._user.password = user.password;
    this._dialogRef.close(this._user);
  }

  /**
   * Method to build the change password form
   * @private
   *
   * @return {FormGroup}
   */
  private _buildPasswordUpdateForm(): FormGroup {
    return new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.password])),
      passwordConfirm: new FormControl('', Validators.compose([Validators.required])),

    }, {validators: CustomValidators.passwordDif("password", "passwordConfirm")});

  }
}
