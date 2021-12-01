import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Card} from "../types/card.type";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  /// BackendURL with all urls of the backend to make request
  private readonly _backendURL: any;

  /**
   * Constructor of the Card service
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
   * Fetch all cards of the backend DB
   *
   * @return {Observable<Card[]>}
   */
  fetch(): Observable<Card[]> {
    return this._http.get<Card[]>(this._backendURL.allCard);
  }

  /**
   * Fetch card by id of the backend
   *
   * @param idCard {string} id of the db
   * @return {Observable<Card>} id of the card to be fetched
   */
  fetchById(idCard: string): Observable<Card> {
    return this._http.get<Card>(this._backendURL.getCardById.replace(":id", idCard));
  }
}
