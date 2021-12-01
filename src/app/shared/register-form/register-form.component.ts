import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../types/user.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../../login/login.component";
import {CustomValidators} from "../validators/custom-validators";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnChanges {

  constructor(private _dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) private _data: { error: boolean, user: User }) {
    this._user = _data.user;
    this._error = _data.error;
    this._hide = true;


    this._registerForm = new FormGroup({
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.password])),
      passwordConfirm: new FormControl('', Validators.compose([Validators.required])),
      birthDate: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), CustomValidators.email])),
      photo: new FormControl()
    }, {validators: CustomValidators.passwordDif("password", "passwordConfirm")});
  }

  private _registerForm: FormGroup;

  get registerForm(): FormGroup {
    return this._registerForm;
  }

  set registerForm(value: FormGroup) {
    this._registerForm = value;
  }

  private _user: User;

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
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

  set error(error: boolean) {
    this._error = error;
  }

  ngOnInit(): void {
  }

  ngOnChanges(record: any): void {
    this._user = {
      photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
      firstname: '',
      lastname: '',
      password: '',
      email: '',
      username: '',
      birthDate: 'JJ/MM/AAAA'
    };

    this._registerForm.patchValue(this._user);
  }

  redirectBack() {
    this._dialogRef.close();
  }

  create(user: User) {
    this._dialogRef.close(user);
  }
}
