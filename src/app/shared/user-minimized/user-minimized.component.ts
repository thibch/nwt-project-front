import {Component, Input, OnInit} from '@angular/core';
import {User} from "../types/user.type";

@Component({
  selector: 'app-user-minimized',
  templateUrl: './user-minimized.component.html',
  styleUrls: ['./user-minimized.component.css']
})
export class UserMinimizedComponent implements OnInit {

  /// User to display profil in minimized
  private _user: User;

  /**
   * Constructor of the minimized profile component
   */
  constructor() {
    this._user = {} as User;
  }

  /**
   * Getter of the minimized user
   *
   * @return {User}
   */
  get user(): User {
    return this._user;
  }

  /**
   * Setter of the minimized user
   *
   * @param value {User} user to display in minimized
   */
  @Input('user')
  set user(value: User) {
    this._user = value;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
  }
}
