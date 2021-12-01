import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Collection} from "../types/collection.type";
import {defaultIfEmpty, filter} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  /// BackendURL with all urls of the backend to make request
  private readonly _backendURL: any;

  /**
   * Constructor of the Collection service
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
   * Method used to roll 10 card and add it to the collection of the gived id user
   *
   * @param id {string|undefined} id of the user to add rolled card
   * @return {Observable<Collection[]>} list of collections updated
   */
  roll(id: string | undefined): Observable<Collection[]> {
    return this._http.put<Collection[]>(this._backendURL.roll.replace(':idUser', id), {}).pipe(
      filter((collections: Collection[]) => !!collections),
      defaultIfEmpty([] as Collection[]),
    );
  }

  /**
   * Function to fetch all collections for a user
   *
   * @param id {string} id of the user
   * @return {Observable<Collection[]>} list of collections of the user
   */
  getAllCollectionById(id: string): Observable<Collection[]> {
    return this._http.get<Collection[]>(this._backendURL.allCollectionByUserId.replace(":id", id));
  }

  /**
   * Function to fetch all collection wich can be trade (amoun>waiting for trade amount) for a user
   *
   * @param id {string} id of the user
   * @return {Observable<Collection[]>} list of collections tradable of the user
   */
  getAllCollectionTradableById(id: string): Observable<Collection[]> {
    return this._http.get<Collection[]>(this._backendURL.allCollectionTradableByUserId.replace(":id", id));
  }
}
