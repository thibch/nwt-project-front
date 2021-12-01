import {Component, OnInit} from '@angular/core';
import {LoginService} from "../shared/services/login.service";
import {User} from "../shared/types/user.type";
import {StorageService} from "../shared/services/storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Constructor of the home component
   *
   * @param _loginService {LoginService} service managing login
   * @param _storageService {StorageService} service managing token and user storage
   * @param _jwtHelper {JwtHelperService} service managing jwt tokens
   */
  constructor(private _loginService: LoginService, private _storageService: StorageService, private _jwtHelper: JwtHelperService) {
    this._user = {} as User;
    if (_storageService.getToken() && !this._jwtHelper.isTokenExpired(this._storageService.getToken() as string)) {
      this._user = this._storageService.getUser();
    }
  }

  /// Currently logged used (if present)
  private _user: User;

  /**
   * Getter of the logged user
   *
   * @return {User}
   */
  get user(): User {
    return this._user;
  }

  /**
   * On Init implementation
   */
  ngOnInit(): void {
  }
}
