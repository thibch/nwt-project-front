import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {User} from "../shared/types/user.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  private _hide: boolean;
  private _error: boolean;
  private _user : User;

  constructor(private _dialogRef: MatDialogRef<LoginComponent>, private _router: Router, @Inject(MAT_DIALOG_DATA) private _data: { error: boolean, user: User }) {
    this._hide =true;
    this._error = _data.error;
    this._user = _data.user;

  }


  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  ngOnInit(): void {
  }


  get error(): boolean {
    return this._error;
  }

  set error(value: boolean) {
    this._error = value;
  }

  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
  }

  redirectBack() {
    this._dialogRef.close();
    this._router.navigate(['/home'])
  }

  login(user: User) {
    this._dialogRef.close(user);
  }
}
