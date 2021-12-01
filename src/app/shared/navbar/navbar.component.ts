import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../types/user.type";
import {LoginService} from "../services/login.service";
import {StorageService} from "../services/storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationsViewComponent} from "../../notifications-view/notifications-view.component";
import {Notification} from "../types/notification.type";
import {NotificationsService} from "../services/notifications.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _user: User;

  private _notificationDialog: MatDialogRef<NotificationsViewComponent, any>;

  private _subscription: Subscription;

  constructor(private _loginService: LoginService, private _dialog: MatDialog, private _storageService: StorageService, private _jwtHelper: JwtHelperService, private _notificationService: NotificationsService) {
    this._user = {} as User;
    this._notificationDialog = {} as MatDialogRef<NotificationsViewComponent, any>;
    this._notifications = [];
    this._subscription = {} as Subscription;
  }

  private _notifications: Notification[];

  get notifications(): Notification[] {
    return this._notifications;
  }

  ngOnInit(): void {
    this._subscription = this._storageService.subjectUser.subscribe(value => {
      if (this._storageService.getToken() && !this._jwtHelper.isTokenExpired(this._storageService.getToken() as string)) {
        this._user = this._storageService.getUser();
      }
      if (this._storageService.getUser().id != undefined) {
        this._notificationService.getAllNotificationsById(this._storageService.getUser().id as string).subscribe(
          data => {
            this._notifications = data
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this._subscription && this._subscription.unsubscribe();
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
