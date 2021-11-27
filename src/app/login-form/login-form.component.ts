import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: []
})
export class LoginFormComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<LoginComponent>) {


  }

  ngOnInit(): void {
  }


  redirectBack() {
    this._dialogRef.close();
  }
}
