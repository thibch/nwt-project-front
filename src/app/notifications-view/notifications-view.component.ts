import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {Notification} from "../shared/types/notification.type";
import {NotificationsService} from "../shared/services/notifications.service";
import {User} from "../shared/types/user.type";
import {StorageService} from "../shared/services/storage.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications-view.component.html',
  styleUrls: ['./notifications-view.component.css']
})
export class NotificationsViewComponent implements OnInit {
  private _notifications: Notification[];

  constructor(private _dialogRef: MatDialogRef<NavbarComponent>, private _notificationService: NotificationsService, private _storageService: StorageService) {
    this._notifications = [];
    _notificationService.getAllNotificationsById(_storageService.getUser().id as string).subscribe(
      data => {this._notifications=  data}
    );
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
