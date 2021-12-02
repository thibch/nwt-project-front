import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../types/user.type";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /// BackendURL with all urls of the backend to make request
  private readonly _backendURL: any;

  /**
   * Constructor of the User service
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
   * Function to create a new user
   *
   * @param user {User} user to create
   * @return {Observable<any>}
   */
  create(user: User): Observable<any> {
    return this._http.post<User>(this._backendURL.allUser, user, this._options());
  }

  /**
   * Method to patch user fields
   *
   * @param id {string} id of the user to patch
   * @param user {user} new user values to set
   * @return {Observable<any>}
   */
  patch(id: string, user: User): Observable<any> {
    return this._http.patch<User>(this._backendURL.getById.replace(':id', id), user, this._options());
  }

  /**
   * Method to fetch all users
   *
   * @return {Observable<User>} list of all users
   */
  fetch(): Observable<User[]> {
    return this._http.get<User[]>(this._backendURL.allUser);
  }

  /**
   * Method to delete an user account
   *
   * @param id {string} id of the user account to delete
   * @return {Observable<string>}
   */
  delete(id: string): Observable<string> {
    console.log(id);
    return this._http.delete(this._backendURL.getById.replace(":id", id), this._options()).pipe(map(() => id));
  }

  /**
   * Method to get an user account by id
   *
   * @param id {string} id of the account to get
   * @return {Observable<User>}
   */
  fetchOne(id: string): Observable<User> {
    return this._http.get<User>(this._backendURL.getById.replace(':id', id));
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
