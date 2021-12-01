import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../shared/types/user.type";
import {Router} from "@angular/router";
import {LoginService} from "../shared/services/login.service";
import {StorageService} from "../shared/services/storage.service";
import {filter, map, mergeMap} from "rxjs/operators";
import {UserService} from "../shared/services/user.service";
import {AuthFormComponent} from "../shared/auth-form/auth-form.component";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  /// Dialog for the autenthification before deleting the account
  private _deleteDialog: MatDialogRef<AuthFormComponent, User>;

  /// User wich is currently logged
  private _loggedUser: User;

  /// Boolean, used to display an error in the auth form if auth failed
  private _error: boolean;

  /**
   * Constructor of the delete component wich open an authentification dialog
   *
   * @param _router {Router} router used for the redirections
   * @param _dialog {MatDialog} mat dialog used to open the authentification form
   * @param _loginService {LoginService} service managing login
   * @param _storageService {StorageService} service managing the storage
   * @param _userService {UserService} service managing users
   */
  constructor(private _router: Router, private _dialog: MatDialog, private _loginService: LoginService, private _storageService: StorageService, private _userService: UserService) {
    this._deleteDialog = {} as MatDialogRef<AuthFormComponent, User>;
    this._loggedUser = {} as User;
    this._error = false;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
    this._loggedUser = this._storageService.getUser();
    this._error = false;
    this._openDialog()
  }

  /**
   * Method wich open the authentification form to check user password before deleting the account
   * @private
   */
  private _openDialog() {
    // Creating the form
    this._deleteDialog = this._dialog.open(AuthFormComponent, {
      width: '400px',
      disableClose: true,
      data: {error: this._error, user: this._loggedUser, operation: "suppression"}
    });

    // When the form is closed
    this._deleteDialog.afterClosed()
      .pipe(
        filter((user: User | undefined) => !!user),
        map((user: User | undefined) => (user as User)),
        mergeMap((user: User) => this._loginService.auth(user)),
      ).subscribe(
      data => {
        // If authentification succeed, we delete the account
        this._userService.delete(data.id).subscribe(
          data => {
            this._storageService.logout();
            this._router.navigate(['/home'])
            this._error = false;
          },
          error => {
            this._error = true;
            this._openDialog();
          });
      },
      error => {
        // Else, we print an error and reopen the dialog
        this._error = true;
        this._openDialog();
      });
  }
}
