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

  /// Mat dialog ref to the notification view component
  private _notificationDialog: MatDialogRef<NotificationsViewComponent, any>;

  /// Subscription subscription to the notifications findAll
  private _subscription: Subscription;

  /// User currently logged in
  private _user: User;

  /// List of the user notifications
  private _notifications: Notification[];

  /**
   * Constructor of the navbar
   *
   * @param _loginService {LoginService} service wich managee login
   * @param _dialog {MatDialog} dialog to open notification view
   * @param _storageService {StorageService} service managing tokens and users storage
   * @param _jwtHelper {JwtHelperService} service managing jwt tokens
   * @param _notificationService {NotificationsService} service managing notifications
   */
  constructor(private _loginService: LoginService, private _dialog: MatDialog, private _storageService: StorageService, private _jwtHelper: JwtHelperService, private _notificationService: NotificationsService) {
    this._user = {} as User;
    this._notificationDialog = {} as MatDialogRef<NotificationsViewComponent, any>;
    this._notifications = [];
    this._subscription = {} as Subscription;
  }

  /**
   * Getter of the currently logged in user
   *
   * @return {User}
   */
  get user(): User {
    return this._user;
  }

  /**
   * Getter of the list of notifications of the user
   *
   * @return {Notification[]}
   */
  get notifications(): Notification[] {
    return this._notifications;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
    this.checkToken();
    this.checkUser();
    // Set user value and notifications
    this._subscription = this._storageService.subjectUser.subscribe(value => {
      this.checkToken();
      this.checkUser();
    });
  }

  /**
   * Check if the token in the storage is available
   */
  private checkToken() {
    if (this._storageService.getToken() && !this._jwtHelper.isTokenExpired(this._storageService.getToken() as string)) {
      this._user = this._storageService.getUser();
    }
  }

  /**
   * Check if the user in the storage is available
   */
  checkUser() {
    if (this._storageService.getUser().id != undefined) {
      this._notificationService.getAllNotificationsById(this._storageService.getUser().id as string).subscribe(
        data => {
          this._notifications = data
        }
      );
    }
  }

  /**
   * On Destroy implementation
   */
  ngOnDestroy(): void {
    this._subscription && this._subscription.unsubscribe();
  }

  /**
   * Method used when the user log out
   */
  logout() {
    // Log out the user and reload the page
    this._storageService.logout();
    location.reload()
  }

  /**
   * Method wich build and open the notification view dialog
   */
  notificationsView() {
    // create modal with initial data inside
    this._notificationDialog = this._dialog.open(NotificationsViewComponent, {
      width: '600px',
      disableClose: true,
      data: {notifications: this.notifications}
    });
  }
}
