import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../types/user.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../../login/login.component";
import {CustomValidators} from "../validators/custom-validators";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnChanges {

  /// Formgroup for registering
  private _registerForm: FormGroup;

  /// User currently in creation (used for completing the form when there's errors)
  private _user: User;

  /// Boolean to know if the password need to be hide or not
  private _hide: boolean;

  /// Boolean to know if an error message need to be displayed
  private _error: boolean;

  /**
   * Constructor of the register form component
   *
   * @param _dialogRef {MatDialogRef} reference to the parent component
   * @param _data {{ error: boolean, user: User }} data provided by parent, error: true if a message error need to by displayed, user: user to fill the form with
   */
  constructor(private _dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) private _data: { error: boolean, user: User }) {
    this._user = _data.user;
    this._error = _data.error;
    this._hide = true;
    this._registerForm = this._buildForm();
  }

  /**
   * Method wich build the form
   * @private
   *
   * @return {FormGroup}
   */
  private _buildForm(): FormGroup{
    return new FormGroup({
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.password])),
      passwordConfirm: new FormControl('', Validators.compose([Validators.required])),
      birthDate: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), CustomValidators.email])),
      photo: new FormControl()
    }, {validators: CustomValidators.passwordDif("password", "passwordConfirm")});
  }

  /**
   * Getter of the registerForm
   *
   * @return {FormGroup}
   */
  get registerForm(): FormGroup {
    return this._registerForm;
  }

  /**
   * Getter of the user currently edited in the form
   *
   * @return {User}
   */
  get user(): User {
    return this._user;
  }

  /**
   * Getter of the hide boolean
   *
   * @return true {boolean} if the password need to be hide, false either
   */
  get hide(): boolean {
    return this._hide;
  }

  /**
   * Setter of the hide boolean
   *
   * @param value {boolean} true if password need to be hide, false either
   */
  set hide(value: boolean) {
    this._hide = value;
  }

  /**
   * Getter of the error boolean
   *
   * @return {boolean} true if an error need to be displayed, false either
   */
  get error(): boolean {
    return this._error;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
  }

  /**
   * On change implementation
   *
   * @param record {any} record of the changes
   */
  ngOnChanges(record: any): void {
    this._user = {
      photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
      firstname: '',
      lastname: '',
      password: '',
      email: '',
      username: '',
      birthDate: 'JJ/MM/AAAA'
    };

    this._registerForm.patchValue(this._user);
  }

  /**
   * Redirect to the dialog parent if the register action is cancelled
   */
  redirectBack() {
    this._dialogRef.close();
  }

  /**
   * Redirect to the dialog parent with user in param for the account creation
   *
   * @param user {User} user to register
   */
  create(user: User) {
    this._dialogRef.close(user);
  }
}
