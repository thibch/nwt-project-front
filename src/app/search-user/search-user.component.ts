import { Component, OnInit } from '@angular/core';
import {User} from "../shared/types/user.type";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  private _users: User[];

  constructor(private _userService: UserService) {
    this._users= {} as User[];
    _userService.fetch().subscribe(
      data => {this._users = data as User[];}
    );
  }

  ngOnInit(): void {
  }


  get users(): User[] {
    return this._users;
  }

  set users(value: User[]) {
    this._users = value;
  }
}
