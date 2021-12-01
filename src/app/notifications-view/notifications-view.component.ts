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
  private _notifications: Notification[];

  constructor(private _dialogRef: MatDialogRef<NavbarComponent>, private _notificationService: NotificationsService, private _storageService: StorageService, @Inject(MAT_DIALOG_DATA) private _data: { notifications: Notification[] }) {
    this._notifications = _data.notifications;
  }


  ngOnInit(): void {

  }


  get notifications(): Notification[] {
    return this._notifications;
  }

  set notifications(value: Notification[]) {
    this._notifications = value;
  }

  close() {
    this._dialogRef.close();
  }
}

