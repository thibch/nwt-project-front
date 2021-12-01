import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {RegisterFormComponent} from "../register-form/register-form.component";
import {User} from "../shared/types/user.type";
import {filter, map, mergeMap} from "rxjs/operators";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  private _registerDialog: MatDialogRef<RegisterFormComponent, User>;
  private _error: boolean;
  private _user: User;

  constructor(private _router: Router, private _dialog: MatDialog, private _userService: UserService) {
    this._registerDialog = {} as MatDialogRef<RegisterFormComponent, User>;
    this._error = false;
    this._user = {} as User;
  }


  get error(): boolean {
    return this._error;
  }

  ngOnInit(): void {
    this._error = false;
    this._openDialog()
  }

  private _openDialog(){
    // create modal with initial data inside
    this._registerDialog = this._dialog.open(RegisterFormComponent, {
      width: '500px',
      disableClose: true,
      data: {error: this._error, user: this._user}
    });


    // subscribe to afterClosed observable to set dialog status and do process
    this._registerDialog.afterClosed()
      .pipe(
        filter((user: any) => !!user),
        map((user: any ) => {

          delete user?.passwordConfirm;

          if(user?.photo == null){
            delete user?.photo;
          }

          user.id = this._user.id;
          this._user = user;
          return user;
        }),
        mergeMap((user: User | undefined) => this._userService.create(user as User))
      )
      .subscribe(
        data => {
          this._error = false;
          this._user = {
            username: data.username,
            email: data.email,
            lastname: data.lastname,
            firstname: data.firstname,
            birthDate: data.birthDate,
            photo: data.photo,
            password: ""
          };
          this._router.navigate(['/home']);
        },
        error => {
          this._error = true;
          this._openDialog();
        }
      );
  }
}
