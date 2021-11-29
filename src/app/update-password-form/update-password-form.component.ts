import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../shared/validators/custom-validators";

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.css']
})
export class UpdatePasswordFormComponent implements OnInit {

  private _hide: boolean;
  private _error: boolean;
  private _user: User;

  constructor(private _dialogRef: MatDialogRef<LoginComponent>, private _router: Router, @Inject(MAT_DIALOG_DATA) private _data: {error: boolean, user: User}) {
    this._hide = true;
    this._error = _data.error;
    this._user = _data.user;

    this._updatePasswordForm = new FormGroup({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.password])),
      passwordConfirm: new FormControl('', Validators.compose([Validators.required])),

    }, {validators: CustomValidators.passwordDif("password", "passwordConfirm")});
  }

  private _updatePasswordForm: FormGroup;

  ngOnInit(): void {
  }

  get updatePasswordForm(): FormGroup {
    return this._updatePasswordForm;
  }

  set updatePasswordForm(value: FormGroup) {
    this._updatePasswordForm = value;
  }

  redirectBack() {
    this._dialogRef.close();
    this._router.navigate(['/home'])
  }


  changePass(user: User) {
    this._user.password = user.password;
    this._dialogRef.close(this._user);
  }


  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
  }

  get error(): boolean {
    return this._error;
  }

  set error(value: boolean) {
    this._error = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
