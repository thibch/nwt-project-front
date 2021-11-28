import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LoginFormComponent} from "../login-form/login-form.component";
import {User} from "../shared/types/user.type";
import {filter, map, mergeMap} from "rxjs/operators";
import {LoginService} from "../shared/services/login.service";
import {error} from "@angular/compiler/src/util";
import {StorageService} from "../shared/services/storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  private _loginDialog: MatDialogRef<LoginFormComponent, any>;
  private _loggedUser: User | undefined;
  private _error: boolean;

  constructor(private _router: Router, private _dialog: MatDialog, private _errorDialog: MatDialog, private _loginService: LoginService, private _storageService: StorageService) {
    this._loginDialog = {} as MatDialogRef<LoginFormComponent, any>;
    this._loggedUser = {} as User;
    this._error =false;
  }

  ngOnInit(): void {
    this._error = false;
    this._openDialog()
  }


  private _openDialog(){
    // create modal with initial data inside
    this._loginDialog = this._dialog.open(LoginFormComponent, {
      width: '300px',
      disableClose: true,
      data: this._error
    });

    this._loginDialog.afterClosed()
      .pipe(
        filter((user: User | undefined) => !!user),
        map((user: User | undefined) => {
          this._loggedUser = user;
          return user;
        }),
        mergeMap((user: User | undefined)=> this._loginService.auth(user as User)),
      ).subscribe(
      data => {
        this._storageService.saveToken(data.access_token);

        this._storageService.saveUser(this._loggedUser);
        this._router.navigate(['/home'])
        this._error = false;
      },
      error => {
        this._error = true;
        this._openDialog()});
  }
}


