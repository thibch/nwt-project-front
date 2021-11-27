import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {LoginFormComponent} from "../login-form/login-form.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  private _loginDialog: MatDialogRef<LoginFormComponent, any>;

  constructor(private _router: Router, private _dialog: MatDialog) {
    this._loginDialog = {} as MatDialogRef<LoginFormComponent, any>;
  }


  ngOnInit(): void {
    // create modal with initial data inside
    this._loginDialog = this._dialog.open(LoginFormComponent, {
      width: '300px',
      disableClose: true,
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._loginDialog.afterClosed()
      .pipe()
      .subscribe({
          error: () => this._router.navigate(['/home']),
          complete: () => this._router.navigate(['/home'])
        }
      );
  }

}
