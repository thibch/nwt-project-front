import {Component, Input, OnInit} from '@angular/core';
import {Notification} from "../shared/types/notification.type";
import {NotificationsService} from "../shared/services/notifications.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  private _notification: Notification;

  constructor(private _notificationService: NotificationsService) {
    this._notification = {} as Notification;
  }

  ngOnInit(): void {
  }


  get notification(): Notification {
    return this._notification;
  }

  @Input("notification")
  set notification(value: Notification) {
    this._notification = value;
  }

  delete() {
    this._notificationService.delete(this.notification.id as string).subscribe();
    this.notification = {} as Notification;
  }
}
