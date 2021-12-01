import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../shared/validators/custom-validators";

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  private _user: User;
  private _hide: boolean;
  private _error: boolean;
  private _updateForm: FormGroup;

  constructor(private _dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) private _data: {error: boolean, user: User}) {
    this._user = _data.user;
    this._error = _data.error;
    this._hide = true;


    this._updateForm = new FormGroup({
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      birthDate: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), CustomValidators.email])),
      photo: new FormControl()
    },{validators: CustomValidators.passwordDif("password", "passwordConfirm")});
  }

  ngOnInit(): void {
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get error():  boolean  {
    return this._error;
  }


  get updateForm(): FormGroup {
    return this._updateForm;
  }

  set updateForm(value: FormGroup) {
    this._updateForm = value;
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

  redirectBack() {
    this._dialogRef.close();
  }

  update(user: User) {
    this._dialogRef.close(user);
  }
}
