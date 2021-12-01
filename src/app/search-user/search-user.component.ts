import {Component, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  constructor(private _userService: UserService, private _router: Router) {
    this._users = [];
    _userService.fetch().subscribe(
      data => {
        this._users = data;
      }
    );
  }

  private _users: User[];

  get users(): User[] {
    return this._users;
  }

  set users(value: User[]) {
    this._users = value;
  }

  ngOnInit(): void {
  }

  openProfile(user: User) {
    this._router.navigate(['/user/' + user.id + '/profile'])
  }
}
