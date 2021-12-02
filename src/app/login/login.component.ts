import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LoginFormComponent} from "../shared/login-form/login-form.component";
import {User} from "../shared/types/user.type";
import {filter, map, mergeMap} from "rxjs/operators";
import {LoginService} from "../shared/services/login.service";
import {StorageService} from "../shared/services/storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  /// Mat dialog to open the Login form
  private _loginDialog: MatDialogRef<LoginFormComponent, any>;

  /// User currently logging in
  private _loggedUser: User | undefined;

  /// Boolean to print error if authentification fail
  private _error: boolean;

  /**
   * Constructor of the login component
   *
   * @param _router {Router} router for the redirections
   * @param _dialog {MatDialog} mat dialog where the form will be displayed
   * @param _loginService {LoginService} service managing login
   * @param _storageService {StorageService} service managing storage of tokens and users
   */
  constructor(private _router: Router, private _dialog: MatDialog, private _loginService: LoginService, private _storageService: StorageService) {
    this._loginDialog = {} as MatDialogRef<LoginFormComponent, any>;
    this._loggedUser = {} as User;
    this._error = false;
  }

  /**
   * On Init implemenation
   */
  ngOnInit(): void {
    this._error = false;
    this._openDialog()
  }

  /**
   * Open the authentification login
   * @private
   */
  private _openDialog() {
    // create modal with initial data inside
    this._loginDialog = this._dialog.open(LoginFormComponent, {
      width: '300px',
      disableClose: true,
      data: {error: this._error, user: this._loggedUser}
    });

    // When the dialog is closed
    this._loginDialog.afterClosed()
      .pipe(
        filter((user: User | undefined) => !!user),
        map((user: User | undefined) => {
          this._loggedUser = user;
          return user;
        }),
        mergeMap((user: User | undefined) => this._loginService.auth(user as User)),
      ).subscribe(
      data => {
        // If login succeed, we save the user in local storage with the token

        this._storageService.saveUser({
          username: data.username,
          email: data.email,
          lastname: data.lastname,
          firstname: data.firstname,
          birthDate: data.birthDate,
          id: data.id,
          photo: data.photo,
          password: ""
        });
        this._storageService.saveToken(data.access_token);

        // Redirect back to home
        this._router.navigate(['/home']);
        this._error = false;
      },
      error => {
        // On error, we open the dialog with an error
        this._error = true;
        this._openDialog()
      });
  }
}


