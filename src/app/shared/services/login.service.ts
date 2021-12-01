import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../types/user.type";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /// BackendURL with all urls of the backend to make request
  private readonly _backendURL: any;

  /**
   * Constructor of the Login service
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
   * Authentification method
   *
   * @param user {User} user to authentifiate
   * @return {Observable<any>} containing jwt token and user if authentification succeed
   */
  auth(user: User): Observable<any> {
    return this._http.post(this._backendURL.login, user, this._options());
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

