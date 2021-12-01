import {Component, Input, OnInit} from '@angular/core';
import {User} from "../types/user.type";

@Component({
  selector: 'app-user-minimized',
  templateUrl: './user-minimized.component.html',
  styleUrls: ['./user-minimized.component.css']
})
export class UserMinimizedComponent implements OnInit {

  constructor() {
    this._user = {} as User;
  }

  private _user: User;

  get user(): User {
    return this._user;
  }

  @Input('user')
  set user(value: User) {
    this._user = value;
  }

  ngOnInit(): void {
  }
}
