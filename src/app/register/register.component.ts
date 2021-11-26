import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginFormComponent} from "../login-form/login-form.component";
import {Router} from "@angular/router";
import {RegisterFormComponent} from "../register-form/register-form.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  private _registerDialog: MatDialogRef<RegisterFormComponent, any>;

  constructor(private _router: Router,  private _dialog: MatDialog) {
    this._registerDialog = {} as MatDialogRef<RegisterFormComponent,any>;
  }



  ngOnInit(): void {
    // create modal with initial data inside
    this._registerDialog = this._dialog.open(RegisterFormComponent, {
      width: '600px',
      disableClose: true,
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._registerDialog.afterClosed()
      .pipe( )
      .subscribe({
          error: () => this._router.navigate(['/home']),
          complete: () => this._router.navigate(['/home'])
        }
      );
  }

}
