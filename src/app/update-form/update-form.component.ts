import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../shared/validators/custom-validators";

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  /**
   * Constructor of the update form
   *
   * @param _dialogRef {MatDialogRef<LoginComponent>} reference to the parent dialogue
   * @param _data {{ error: boolean, user: User }} dates provided by the parent, error: true if the form need to display error, user to use to fill form
   */
  constructor(private _dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) private _data: { error: boolean, user: User }) {
    this._user = _data.user;
    this._error = _data.error;
    this._hide = true;
    this._updateForm = this._buildUpdateForm()
  }

  /// User currently updating him informations
  private _user: User;

  /**
   * Getter of the user to update
   *
   * @return {User}
   */
  get user(): User {
    return this._user;
  }

  /// Boolean variable to know if the password need to be hide or not
  private _hide: boolean;

  /**
   * Getter of the hide boolean
   *
   * @return {boolean} true if the password need to be hide, false either
   */
  get hide(): boolean {
    return this._hide;
  }

  /// Boolean variable to know if an error need to be displayed
  private _error: boolean;

  /**
   * Getter of the error boolean
   *
   * @return {boolean} true if an error need to be displayed in the form, false either
   */
  get error(): boolean {
    return this._error;
  }

  /// FormGroup used to updates users informations
  private _updateForm: FormGroup;

  /**
   * Getter to get the updateForm
   *
   * @return {FormGroup}
   */
  get updateForm(): FormGroup {
    return this._updateForm;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
  }

  /**
   * Method wich close the update dialog if the user choose to cancel the update
   */
  redirectBack() {
    this._dialogRef.close();
  }

  /**
   * Method wich close the update dialog and send the new user
   *
   * @param user {User} new users informations
   */
  update(user: User) {
    this._dialogRef.close(user);
  }

  /**
   * Method to build the form
   * @private
   *
   * @return {FormGroup}
   */
  private _buildUpdateForm(): FormGroup {
    return new FormGroup({
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      birthDate: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), CustomValidators.email])),
      photo: new FormControl()
    }, {validators: CustomValidators.passwordDif("password", "passwordConfirm")});
  }
}
