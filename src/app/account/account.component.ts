import {Component, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {LoginService} from "../shared/services/login.service";
import {StorageService} from "../shared/services/storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {filter, map, mergeMap} from "rxjs/operators";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";
import {UpdateFormComponent} from "../update-form/update-form.component";
import {UpdatePasswordFormComponent} from "../update-password-form/update-password-form.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  /// Boolean, true if last form was not valid, false either
  private _error: boolean;
  /// MatDialogRef to an UpdateFormComponent managing User
  private _updateDialog: MatDialogRef<UpdateFormComponent, User>;
  /// MatDialogRef to an UpdatePasswordFormComponent managing User
  private _updatePasswordDialog: MatDialogRef<UpdatePasswordFormComponent, User>;

  /**
   * Constructor of a Account Component
   *
   * @param _loginService {LoginService} service managing Login
   * @param _dialog {MatDialog} matdialog to open forms
   * @param _storageService {StorageService} service managing token and connected user
   * @param _userService {UserService} service managing users
   * @param _router {Route} router
   * @param _jwtHelper {JwtHelperService} service managing jwt tokens
   */
  constructor(private _loginService: LoginService, private _dialog: MatDialog, private _storageService: StorageService, private _userService: UserService, private _router: Router, private _jwtHelper: JwtHelperService) {
    this._user = {} as User;
    this._error = false;
    this._updateDialog = {} as MatDialogRef<UpdateFormComponent, User>;
    this._updatePasswordDialog = {} as MatDialogRef<UpdatePasswordFormComponent, User>;
  }

  /// User currently connected
  private _user: User;

  /**
   * Getter of an user
   *
   * @return User user connected
   */
  get user(): User {
    return this._user;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
    if (this._storageService.getToken() && !this._jwtHelper.isTokenExpired(this._storageService.getToken() as string)) {
      this._user = this._storageService.getUser();
    }
  }

  /**
   * Open update form
   */
  updateUser() {
    this._error = false;
    this._openUpdateFormDialog();
  }

  /**
   * Open change password form
   */
  changePassword() {
    this._error = false;
    this._openUpdatePasswordFormDialog()
  }

  /**
   * Open the change passord form
   * @private
   */
  private _openUpdateFormDialog() {
    // create modal with initial data inside
    this._updateDialog = this._dialog.open(UpdateFormComponent, {
      width: '500px',
      disableClose: true,
      data: {error: this._error, user: this._user}
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._updateDialog.afterClosed()
      .pipe(
        filter((user: any) => !!user),
        map((user: any) => {
          // Delete unused fields
          delete user?.passwordConfirm;
          if (user?.photo == null) {
            delete user?.photo;
          }
          this._user = user;
          return user;
        }),
        mergeMap((user: User | undefined) => this._userService.patch(this._storageService.getUser().id as string, user as User))
      )
      .subscribe(
        data => {
          // If all is ok, update storage service with the new user and redirect
          this._error = false;
          this._user = data;
          this._user.id = this._storageService.getUser().id;
          this._storageService.saveUser(this.user);
          this._router.navigate(['/home']);
        },
        error => {
          // Else, update the same form again with an error
          this._error = true;
          this._openUpdateFormDialog();
        }
      );
  }

  /**
   * Open the update password form
   * @private
   */
  private _openUpdatePasswordFormDialog() {
    // create modal with initial data inside
    this._updatePasswordDialog = this._dialog.open(UpdatePasswordFormComponent, {
      width: '500px',
      disableClose: true,
      data: {error: this._error, user: this._user}
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._updatePasswordDialog.afterClosed()
      .pipe(
        filter((user: any) => !!user),
        map((user: any) => {
          // Delete unused fields
          delete user.id;
          this._user = user;
          return user;
        }),
        mergeMap((user: User | undefined) => this._userService.patch(this._storageService.getUser().id as string, user as User))
      )
      .subscribe(
        data => {
          // If all is ok, save user in localstorage and redirect back to home
          this._error = false;
          this._storageService.saveUser(this.user);
          this._router.navigate(['/home']);
        },
        error => {
          // Else, print error and reopen the form
          this._error = true;
          this._openUpdatePasswordFormDialog();
        }
      );
  }
}
