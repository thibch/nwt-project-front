import {Component, Input, OnInit} from '@angular/core';
import {User} from "../types/user.type";

@Component({
  selector: 'app-user-minimized',
  templateUrl: './user-minimized.component.html',
  styleUrls: ['./user-minimized.component.css']
})
export class UserMinimizedComponent implements OnInit {

  private _user: User;

  constructor() {
    this._user= {} as User;
  }

  ngOnInit(): void {
  }


  get user(): User {
    return this._user;
  }

  @Input('user')
  set user(value: User) {
    this._user = value;
  }
}
