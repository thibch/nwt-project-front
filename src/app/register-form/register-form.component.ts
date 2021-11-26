import {Component, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/types/user.type";
import {MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styles: [
  ]
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

  constructor(private _dialogRef: MatDialogRef<LoginComponent>) {
    this._user = {} as User;

    this._registerForm = new FormGroup({
    firstname: new FormControl('',Validators.compose([Validators.required, Validators.minLength(2)])),
    lastname: new FormControl('',Validators.compose([Validators.required, Validators.minLength(2)])),
    pseudo: new FormControl('',Validators.compose([Validators.required, Validators.minLength(2)])),

    /// TODO Custom Validator
    password: new FormControl('',Validators.compose([Validators.required, Validators.minLength(8)])),
      passwordConfirm: new FormControl('',Validators.compose([Validators.required, Validators.minLength(8)])),

    /// TODO Custom Validator
    birthdate: new FormControl(),

    /// TODO Custom Validator
    email: new FormControl('',Validators.compose([Validators.required, Validators.minLength(2)])),

    photo: new FormControl()
  });}

  ngOnInit(): void {
  }

  ngOnChanges(record: any): void {
      this._user = {
        photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
        firstname: '',
        lastname: '',
        password: '',
        email: '',
        pseudo: '',
        birthdate: 'JJ/MM/AAAA'
      };

    this._registerForm.patchValue(this._user);
  }

  redirectBack() {
    this._dialogRef.close();
  }
}
