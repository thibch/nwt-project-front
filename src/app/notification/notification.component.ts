import {Component, Input, OnInit} from '@angular/core';
import {Notification} from "../shared/types/notification.type";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  private _notification: Notification;

  constructor() {
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
}
