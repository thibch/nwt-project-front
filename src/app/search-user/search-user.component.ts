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

  /**
   * Constructor of the search user component
   *
   * @param _userService {UserService} service managing users
   * @param _router {Router} router for the redirection on each individual profile
   */
  constructor(private _userService: UserService, private _router: Router) {
    this._users = [];
  }

  /// List of all users to display
  private _users: User[];

  /**
   * Getter of all the users
   *
   * @return {User[]}
   */
  get users(): User[] {
    return this._users;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
    // Getting all user
    this._userService.fetch().subscribe(
      data => {
        this._users = data;
      }
    );
  }

  /**
   * Open a user profile
   * @param user {User} user to display profile
   */
  openProfile(user: User) {
    // Redirection on individual page
    this._router.navigate(['/user/' + user.id + '/profile'])
  }
}
