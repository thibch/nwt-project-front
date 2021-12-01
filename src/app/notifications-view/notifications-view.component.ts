import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NavbarComponent} from "../shared/navbar/navbar.component";
import {Notification} from "../shared/types/notification.type";
import {NotificationsService} from "../shared/services/notifications.service";
import {StorageService} from "../shared/services/storage.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.css']
})
export class NotificationsViewComponent implements OnInit {

  /// List of all notifications of the user
  private _notifications: Notification[];

  /**
   * Constructor of the notification view
   *
   * @param _dialogRef {MatDialogRef} reference of the dialog
   * @param _notificationService {NotificationsService} service managing notifications
   * @param _storageService {StorageService} service managing storage of tokens and users
   * @param _data {{ notifications: Notification[] }} list of all the notifications gived by the reference component
   */
  constructor(private _dialogRef: MatDialogRef<NavbarComponent>, private _notificationService: NotificationsService, private _storageService: StorageService, @Inject(MAT_DIALOG_DATA) private _data: { notifications: Notification[] }) {
    this._notifications = _data.notifications;
  }

  /**
   * Getter of the list of all notifications
   *
   * @return {Notifications[]}
   */
  get notifications(): Notification[] {
    return this._notifications;
  }

  /**
   * Setter of the list of notifications
   *
   * @param value {Notification[]} list of all notifications
   */
  set notifications(value: Notification[]) {
    this._notifications = value;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {}

  /**
   * Close the dialog
   */
  close() {
    this._dialogRef.close();
  }
}

