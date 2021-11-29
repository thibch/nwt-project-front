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

  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  /**
   * Function to create a new user
   */
  create(user: User): Observable<any> {
    return this._http.post<User>(this._backendURL.allUser, user, this._options());
  }

  /**
   * Function to fetch all users
   */
  fetch(): Observable<User[]> {
    return this._http.get<User[]>(this._backendURL.allUser);
  }

  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.getById.replace(":id", id)).pipe(map(() => id));
  }

  private _options(headerList: object = {}): any {
    return {headers: new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, headerList))};
  }

  patch(id: string, user: User): Observable<any> {
    return this._http.patch<User>(this._backendURL.getById.replace(':id', id), user, this._options());
  }

  fetchOne(id: string): Observable<User> {
    return this._http.get<User>(this._backendURL.getById.replace(':id', id));
  }
}
