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

  private _user: User;

  constructor(private _dialogRef: MatDialogRef<LoginComponent>, private _router: Router, @Inject(MAT_DIALOG_DATA) private _data: { error: boolean, user: User, operation: string }) {
    this._hide = true;
    this._error = _data.error;
    this._user = _data.user;
    this._operation = _data.operation;
  }

  private _hide: boolean;

  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
  }

  private _error: boolean;

  get error(): boolean {
    return this._error;
  }

  set error(value: boolean) {
    this._error = value;
  }

  private _operation: string;

  get operation(): string {
    return this._operation;
  }

  set operation(value: string) {
    this._operation = value;
  }

  ngOnInit(): void {

  }

  redirectBack() {
    this._dialogRef.close();
    this._router.navigate(['/home'])
  }

  auth(user: User) {
    user.username = this._user.username;

    this._dialogRef.close(user);
  }

}
