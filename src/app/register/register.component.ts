import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {RegisterFormComponent} from "../shared/register-form/register-form.component";
import {User} from "../shared/types/user.type";
import {filter, map, mergeMap} from "rxjs/operators";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  /// Mat dialog reference for the register form, managing user
  private _registerDialog: MatDialogRef<RegisterFormComponent, User>;

  /// User currently trying to register (for fill the form if register fail)
  private _user: User;

  /// Boolean to print an error on reopening the form if register fail
  private _error: boolean;

  /**
   * Constructor of the register component, opening a dialog with the register form
   *
   * @param _router {Router} router used for the redirection
   * @param _dialog {MatDialog} dialog for opening the register form
   * @param _userService {UserService} service managing users
   */
  constructor(private _router: Router, private _dialog: MatDialog, private _userService: UserService) {
    this._registerDialog = {} as MatDialogRef<RegisterFormComponent, User>;
    this._error = false;
    this._user = {} as User;
  }

  /**
   * Getter to know if there's an error in the register
   *
   * @return {boolean}
   */
  get error(): boolean {
    return this._error;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
    this._error = false;
    this._openDialog()
  }

  /**
   * Method to open the registering form
   * @private
   */
  private _openDialog() {
    // create modal with initial data inside
    this._registerDialog = this._dialog.open(RegisterFormComponent, {
      width: '500px',
      disableClose: true,
      data: {error: this._error, user: this._user}
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._registerDialog.afterClosed()
      .pipe(
        filter((user: any) => !!user),
        map((user: any) => {
          // Delete unused fields
          delete user?.passwordConfirm;
          if (user?.photo == null) {
            delete user?.photo;
          }
          user.id = this._user.id;
          this._user = user;
          return user;
        }),
        mergeMap((user: User | undefined) => this._userService.create(user as User))
      )
      .subscribe(
        data => {
          // If there's no error, updating the user var and redirecting to /home
          this._error = false;
          this._user = {
            username: data.username,
            email: data.email,
            lastname: data.lastname,
            firstname: data.firstname,
            birthDate: data.birthDate,
            photo: data.photo,
            password: ""
          };
          this._router.navigate(['/home']);
        },
        error => {
          // If there's an error, opening the form with an error message
          this._error = true;
          this._openDialog();
        }
      );
  }
}
