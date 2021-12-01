import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Notification} from "../types/notification.type";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  /// BackendURL with all urls of the backend to make request
  private readonly _backendURL: any;

  /**
   * Constructor of the Notification service
   *
   * @param _http {HttpClient} where request will be made
   */
  constructor(private _http: HttpClient) {

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
   * Method to fetch all notifications by user id
   *
   * @param id {string} user id destination of notifications
   * @return {Observable<Notification[]>}
   */
  getAllNotificationsById(id: string): Observable<Notification[]> {
    return this._http.get<Notification[]>(this._backendURL.allNotificationsById.replace(":id", id));
  }

  /**
   * Method to delete a notification by id
   *
   * @param id {string} id of the notification to delete
   * @return {Observable<any>}
   */
  delete(id: string): Observable<any> {
    return this._http.delete(this._backendURL.getNotificationById.replace(":id", id), this._options());
  }

  /**
   * Function to create a new notification
   *
   * @param notification {Notification} notification to create
   * @return {Observable<any>}
   */
  create(notification: Notification): Observable<any> {
    return this._http.post<Notification>(this._backendURL.notifications, notification, this._options());
  }

  /**
   * Method to get options header
   *
   * @param headerList {object} list of header
   * @private
   * @return {any} headers
   */
  private _options(headerList: object = {}): any {
    return {headers: new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, headerList))};
  }

}
