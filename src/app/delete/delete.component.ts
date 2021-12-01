import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../shared/types/user.type";
import {Router} from "@angular/router";
import {LoginService} from "../shared/services/login.service";
import {StorageService} from "../shared/services/storage.service";
import {filter, map, mergeMap} from "rxjs/operators";
import {AuthFormComponent} from "../auth-form/auth-form.component";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  private _deleteDialog: MatDialogRef<AuthFormComponent, User>;
  private _loggedUser: User | undefined;
  private _error: boolean;

  constructor(private _router: Router, private _dialog: MatDialog, private _errorDialog: MatDialog, private _loginService: LoginService, private _storageService: StorageService, private _userService: UserService) {
    this._deleteDialog = {} as MatDialogRef<AuthFormComponent, User>;
    this._loggedUser = _storageService.getUser();
    this._error =false;
  }

  ngOnInit(): void {
    this._error = false;
    this._openDialog()
  }


  private _openDialog(){

    this._deleteDialog = this._dialog.open(AuthFormComponent, {
      width: '400px',
      disableClose: true,
      data: {error: this._error, user: this._loggedUser, operation: "suppression"}
    });


    this._deleteDialog.afterClosed()
      .pipe(
        filter((user: User | undefined) => !!user),
        map((user: User | undefined) => {
          return user as User;
        }),
        mergeMap((user: User)=> this._loginService.auth( user)),
      ).subscribe(
      data => {

        this._userService.delete(data.id).subscribe(
          data => {
            this._storageService.logout();
            this._router.navigate(['/home'])
            this._error = false;
          },
          error => {
            this._error = true;
            this._openDialog();
          });
          },
      error => {
        this._error = true;
        this._openDialog();
      });
  }
}
