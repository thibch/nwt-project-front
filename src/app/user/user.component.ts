import {Component, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {USERS} from "../_static/users";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  private _user: User;

  constructor() {
    this._user = USERS[0];
  }

  ngOnInit(): void {
  }


  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }
}
