import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {User} from "../shared/types/user.type";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<LoginComponent>) {
  }

  ngOnInit(): void {
  }

  redirectBack() {
    this._dialogRef.close();
  }

  login(user: User) {
    this._dialogRef.close(user);
  }
}
