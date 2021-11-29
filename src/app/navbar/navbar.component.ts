import {Component, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {LoginService} from "../shared/services/login.service";
import {StorageService} from "../shared/services/storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationsViewComponent} from "../notifications-view/notifications-view.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _user: User;

  private _notificationDialog: MatDialogRef<NotificationsViewComponent, any>;

  constructor(private _loginService: LoginService, private _dialog: MatDialog, private _storageService: StorageService, private _jwtHelper: JwtHelperService) {
    this._user = {} as User;
    this._notificationDialog = {} as MatDialogRef<NotificationsViewComponent, any>;
    if (_storageService.getToken() && !this._jwtHelper.isTokenExpired(this._storageService.getToken() as string)) {
      this._user = this._storageService.getUser();
    }
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

  notifications() {
    // create modal with initial data inside
    this._notificationDialog = this._dialog.open(NotificationsViewComponent, {
      width: '600px',
      disableClose: true
    });
  }
}
