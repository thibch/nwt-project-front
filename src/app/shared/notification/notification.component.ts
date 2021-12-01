import {Component, Input, OnInit} from '@angular/core';
import {Notification} from "../types/notification.type";
import {NotificationsService} from "../services/notifications.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  /// Notification currently displayed
  private _notification: Notification;

  /// Exists boolean update when the notification is deleted (to update graphical view)
  private _exists: boolean;

  /**
   * Constructor of the notification component
   *
   * @param _notificationService {NotificationsService} service managing notifications
   */
  constructor(private _notificationService: NotificationsService) {
    this._notification = {} as Notification;
    this._exists = true;
  }

  /**
   * Getter of the notification currently displayed
   *
   * @return {Notification}
   */
  get notification(): Notification {
    return this._notification;
  }

  /**
   * Setter of the notification
   *
   * @param value {Notification} value of the notification
   */
  @Input("notification")
  set notification(value: Notification) {
    this._notification = value;
  }

  /**
   * Getter of the exists boolean
   *
   * @return {boolean} true if the notification exists, false if the notification has been deleted and should not been displayed anymore
   */
  get exists(): boolean {
    return this._exists;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
  }

  /**
   * Method wich delete a notification
   */
  delete() {
    this._notificationService.delete(this.notification.id as string).subscribe();
    this.notification = {} as Notification;
    this._exists = false;
  }
}
