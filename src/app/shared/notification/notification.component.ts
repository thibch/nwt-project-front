import {Component, Input, OnInit} from '@angular/core';
import {Notification} from "../types/notification.type";
import {NotificationsService} from "../services/notifications.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  constructor(private _notificationService: NotificationsService) {
    this._notification = {} as Notification;
    this._exists = true;
  }

  private _notification: Notification;

  get notification(): Notification {
    return this._notification;
  }

  @Input("notification")
  set notification(value: Notification) {
    this._notification = value;
  }

  private _exists: boolean;

  get exists(): boolean {
    return this._exists;
  }

  ngOnInit(): void {
  }

  delete() {
    this._notificationService.delete(this.notification.id as string).subscribe();
    this.notification = {} as Notification;
    this._exists = false;
  }
}
