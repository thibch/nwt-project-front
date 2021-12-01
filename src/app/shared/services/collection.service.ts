import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../types/user.type";
import {Collection} from "../types/collection.type";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
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

  roll() : Observable<Collection[]> { // TODO : GET USER  BEFORE
    console.log('roll');
    return this._http.put<Collection[]>(this._backendURL.roll.replace(':idUser', '61a515c6b44ed1fbcced040b'), {});
  }
}
