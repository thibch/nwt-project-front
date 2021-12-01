import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../types/user.type";
import {Collection} from "../types/collection.type";
import {defaultIfEmpty, filter} from "rxjs/operators";
import {Router} from "@angular/router";

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
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  roll() : Observable<Collection[]> { // TODO : GET USER  BEFORE
    return this._http.put<Collection[]>(this._backendURL.roll.replace(':idUser', '61a515c6b44ed1fbcced040b'), {}).pipe(
      filter((collections: Collection[]) => !!collections),
      defaultIfEmpty([] as Collection[]),
    );
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

  /**
   * Function to fetch all users
   */
  getAllCollectionByUserIdByCardId(idCard: string, idUser: string): Observable<Collection[]> {
    return this._http.get<Collection[]>(this._backendURL.collectionByUserIdByCardId.replace(":idUser", idUser).replace(":idCard", idCard));
  }
}
