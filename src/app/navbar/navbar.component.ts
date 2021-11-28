import { Component, OnInit } from '@angular/core';
import {User} from "../shared/types/user.type";
import {LoginService} from "../shared/services/login.service";
import {StorageService} from "../shared/services/storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _user: User;

  constructor(private _loginService: LoginService, private _storageService: StorageService, private _jwtHelper: JwtHelperService) {
    this._user = {} as User;

    _loginService.test().subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )

    if (_storageService.getToken() && !this._jwtHelper.isTokenExpired(this._storageService.getToken() as string)) {
      this._user = this._storageService.getUser();
    }

    console.log("User: " + this.user)
    console.log("Token: " + _storageService.getToken())
  }

  ngOnInit(): void {
  }


  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  logout() {
    this._storageService.logout();
    location.reload()
  }
}