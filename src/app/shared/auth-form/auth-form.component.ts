import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../types/user.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../../login/login.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  /// User to authentifiate
  private _user: User;

  /// Field to hide or not the password
  private _hide: boolean;

  /// Display error if the authentification fail
  private _error: boolean;

  /// Operation type (Delete account, updating account ...) to display in the component
  private _operation: string;

  /**
   * Constructor of the form
   *
   * @param _dialogRef {MatDialogRef} reference on the parent dialog
   * @param _router {Router} router for redirections
   * @param _data {{ error: boolean, user: User, operation: string }} error: boolean to display if there's an error in auth, user to authentifiate, operation to display
   */
  constructor(private _dialogRef: MatDialogRef<LoginComponent>, private _router: Router, @Inject(MAT_DIALOG_DATA) private _data: { error: boolean, user: User, operation: string }) {
    this._hide = true;
    this._error = _data.error;
    this._user = _data.user;
    this._operation = _data.operation;
  }

  /**
   * Getter of the hide field
   *
   * @return {boolean} True if the password need to be hide, false either
   */
  get hide(): boolean {
    return this._hide;
  }

  /**
   * Setter of the hide field
   *
   * @param value {boolean} hide field
   */
  set hide(value: boolean) {
    this._hide = value;
  }

  /**
   * Getter of the field error
   *
   * @return {boolean} true if there's an error, fale either
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
   * Redirection back to the parent dialog if user cancel the change
   */
  redirectBack() {
    this._dialogRef.close();
    this._router.navigate(['/home'])
  }

  /**
   * Authentification of the user by giving him to parent dialog
   *
   * @param user {User} user to authentifiate
   */
  auth(user: User) {
    user.username = this._user.username;
    this._dialogRef.close(user);
  }

  /**
   * Get the operation type
   *
   * @return {string}
   */
  get operation(): string {
    return this._operation;
  }
}
