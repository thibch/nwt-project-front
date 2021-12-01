import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../../login/login.component";
import {User} from "../types/user.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  /**
   * Constructor of a login form
   *
   * @param _dialogRef {MatDialogRef} reference to the parent component
   * @param _router {Router} router to redirect user if needed
   * @param _data {{ error: boolean, user: User }} error from the last authentification, user who missed first authentification
   */
  constructor(private _dialogRef: MatDialogRef<LoginComponent>, private _router: Router, @Inject(MAT_DIALOG_DATA) private _data: { error: boolean, user: User }) {
    this._hide = true;
    this._error = _data.error;
    this._user = _data.user;
  }

  /// boolean to know if the password need to be hide
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
   * Setter of the hide fiel
   *
   * @param value {boolean} true if the password need to be hide, false either
   */
  set hide(value: boolean) {
    this._hide = value;
  }

  /// boolean to know if an error need to be printed (last authentification failed)
  private _error: boolean;

  /**
   * Getter of the error boolean
   *
   * @return {boolean} return true if last authentification failed
   */
  get error(): boolean {
    return this._error;
  }

  /// user currently trying to authentifiate (autocompletion when user miss first time authentification)
  private _user: User;

  /**
   * Getter of the user currently log in
   *
   * @return {User}
   */
  get user(): User {
    return this._user;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
  }

  /**
   * Method wich close the dialog and redirect back the user to home
   */
  redirectBack() {
    this._dialogRef.close();
    this._router.navigate(['/home'])
  }

  /**
   * Method wich close the dialog and giving the user trying to login to the parent dialog
   *
   * @param user {User}
   */
  login(user: User) {
    this._dialogRef.close(user);
  }
}
