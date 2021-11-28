import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/types/user.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {CustomValidators} from "./custom-validators";
import {MatDialogActions} from "@angular/material/dialog";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnChanges {

  get registerForm(): FormGroup {
    return this._registerForm;
  }

  set registerForm(value: FormGroup) {
    this._registerForm = value;
  }

  private _registerForm: FormGroup;
  private _user: User;
  private _hide: boolean;

  constructor(private _dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) private _error: boolean) {
    this._user = {} as User;
    this._hide = true;
    this._registerForm = new FormGroup({
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), CustomValidators.password])),
      passwordConfirm: new FormControl('', Validators.compose([Validators.required])),
      birthDate: new FormControl(),
      email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), CustomValidators.email])),
      photo: new FormControl()
    },{validators: CustomValidators.passwordDif});

  }


  get error():  boolean  {
    return this._error;
  }

  set error(error: boolean ) {
    this._error = error;
  }

  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
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
