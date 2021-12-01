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

  private _user: User;
  private _error: boolean;

  private _updateDialog: MatDialogRef<UpdateFormComponent, User>;
  private _updatePasswordDialog: MatDialogRef<UpdatePasswordFormComponent, User>;

  constructor(private _loginService: LoginService, private _dialog: MatDialog, private _storageService: StorageService,private _userService: UserService, private _router: Router, private _jwtHelper: JwtHelperService) {
    this._user = {} as User;
    this._error = false;
    this._updateDialog = {} as MatDialogRef<UpdateFormComponent, User>;
    this._updatePasswordDialog = {} as MatDialogRef<UpdatePasswordFormComponent, User>;
  }

  ngOnInit(): void {
    if (this._storageService.getToken() && !this._jwtHelper.isTokenExpired(this._storageService.getToken() as string)) {
      this._user = this._storageService.getUser();
    }
  }

  update() {
    this._error = false;
    this._openDialog();
  }

  changePassword() {
    this._openPasswordDialog()
  }


  private _openDialog() {
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
          this._error = false;
          console.log(this._user);
          console.log(data);
          this._user = data;
          console.log(this._user);
          this._user.id = this._storageService.getUser().id;
          this._storageService.saveUser(this.user);
          this._router.navigate(['/home']);
        },
        error => {
          this._error = true;
          this._openDialog();
        }
      );
  }


  private _openPasswordDialog() {
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


          delete user.id;
          this._user = user;
          return user;
        }),
        mergeMap((user: User | undefined) => this._userService.patch(this._storageService.getUser().id as string, user as User))
      )
      .subscribe(
        data => {
          this._error = false;
          this._storageService.saveUser(this.user);
          this._router.navigate(['/home']);
        },
        error => {
          this._error = true;
          this._openPasswordDialog();
        }
      );
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
