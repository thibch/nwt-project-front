import { Component, OnInit } from '@angular/core';
import {User} from "../shared/types/user.type";
import {LoginService} from "../shared/services/login.service";
import {StorageService} from "../shared/services/storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {RegisterFormComponent} from "../register-form/register-form.component";
import {filter, map, mergeMap} from "rxjs/operators";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";
import {UpdateFormComponent} from "../update-form/update-form.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private _user: User;
  private _error: boolean;

  private _updateDialog: MatDialogRef<UpdateFormComponent, User>;

  constructor(private _loginService: LoginService, private _dialog: MatDialog, private _storageService: StorageService,private _userService: UserService, private _router: Router, private _jwtHelper: JwtHelperService) {
    this._user = {} as User;
    this._error = false;
    this._updateDialog = {} as MatDialogRef<UpdateFormComponent, User>;


    if (_storageService.getToken() && !this._jwtHelper.isTokenExpired(this._storageService.getToken() as string)) {
      this._user = this._storageService.getUser();
    }

  }

  ngOnInit(): void {
  }


  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  update() {
    this._error = false;
    this._openUpdateDialog();
  }

  private _openUpdateDialog(){
    this._openDialog();
  }

  private _openDialog(){
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
        map((user: any ) => {
          delete user?.id;
          delete user?.passwordConfirm;

          if(user?.photo == null){
            delete user?.photo;
          }

          return user;
        }),
        mergeMap((user: User | undefined) => this._userService.update(this._user.id as string, user as User))
      )
      .subscribe(
        data => { this._error=false;
          this._storageService.saveUser(this.user);
          this._router.navigate(['/home']);},
          error => { this._error = true;  this._openDialog();}
      );
  }
}
