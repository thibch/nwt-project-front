import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Collection} from "../types/collection.type";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

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
   * Function to fetch all users
   */
  getAllCollectionById(id: string): Observable<Collection[]> {
    return this._http.get<Collection[]>(this._backendURL.allCollectionByUserId.replace(":id", id));
  }

  /**
   * Function to fetch all users
   */
  getAllCollectionTradableById(id: string): Observable<Collection[]> {
    return this._http.get<Collection[]>(this._backendURL.allCollectionTradableByUserId.replace(":id", id));
  }

}
