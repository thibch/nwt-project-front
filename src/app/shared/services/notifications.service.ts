import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Notification} from "../types/notification.type";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private readonly _backendURL: any;

  constructor(private _router: Router, private _http: HttpClient) {

    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

  /**
   * Function to fetch all notifications
   */
  getAllNotificationsById(id: string): Observable<Notification[]> {
    return this._http.get<Notification[]>(this._backendURL.allNotificationsById.replace(":id", id));
  }

  delete(id: string): Observable<any> {
    return this._http.delete(this._backendURL.getNotificationById.replace(":id", id), this._options());
  }

  private _options(headerList: object = {}): any {
    return {headers: new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, headerList))};
  }

  /**
   * Function to create a new notification
   */
  create(notification: Notification): Observable<any> {
    return this._http.post<Notification>(this._backendURL.notifications, notification, this._options());
  }

}
