import {Component, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {LoginService} from "../shared/services/login.service";
import {StorageService} from "../shared/services/storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationsViewComponent} from "../notifications-view/notifications-view.component";
import {Notification} from "../shared/types/notification.type";
import {NotificationsService} from "../shared/services/notifications.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _user: User;

  private _notificationDialog: MatDialogRef<NotificationsViewComponent, any>;

  constructor(private _loginService: LoginService, private _dialog: MatDialog, private _storageService: StorageService, private _jwtHelper: JwtHelperService, private _notificationService: NotificationsService) {
    this._user = {} as User;
    this._notificationDialog = {} as MatDialogRef<NotificationsViewComponent, any>;
    if (_storageService.getToken() && !this._jwtHelper.isTokenExpired(this._storageService.getToken() as string)) {
      this._user = this._storageService.getUser();
    }

    this._notifications = [];

  }

  private _notifications: Notification[];

  get notifications(): Notification[] {
    return this._notifications;
  }

  ngOnInit(): void {
    if (this._storageService.getUser().id != undefined) {
      this._notificationService.getAllNotificationsById(this._storageService.getUser().id as string).subscribe(
        data => {
          this._notifications = data
        }
      );
    }
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

  notificationsView() {
    // create modal with initial data inside
    this._notificationDialog = this._dialog.open(NotificationsViewComponent, {
      width: '600px',
      disableClose: true,
      data: {notifications: this.notifications}
    });
  }
}
