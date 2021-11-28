import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {RegisterFormComponent} from "../register-form/register-form.component";
import {User} from "../shared/types/user.type";
import {filter, map, mergeMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  private _registerDialog: MatDialogRef<RegisterFormComponent, User>;
  private _error: boolean;

  constructor(private _router: Router, private _dialog: MatDialog, private _userService: UserService) {
    this._registerDialog = {} as MatDialogRef<RegisterFormComponent, any>;
    this._error = false;
  }


  get error(): boolean {
    return this._error;
  }

  set error(value: boolean) {
    this._error = value;
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
      data: this._error
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._registerDialog.afterClosed()
      .pipe(
        filter((user: any) => !!user),
        map((user: any ) => {
          delete user?.id;
          delete user?.passwordConfirm;

          if(user?.photo == null){
            delete user?.photo;
          }

          return user;
        }),
        mergeMap((user: User | undefined) => this._add(user as User))
      )
      .subscribe({
          error: () => { this._error = true;  this._openDialog();},
          complete: () => { this._error=false; this._router.navigate(['/home']);}
        }
      );
  }

  private _add(user: User | undefined): Observable<User> {
    return this._userService.create(user as User);
  }
}
