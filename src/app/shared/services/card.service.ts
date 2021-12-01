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

  fetch(): Observable<Card[]> {
    return this._http.get<Card[]>(this._backendURL.allCard);
  }

  fetchById(idCard: string): Observable<Card> {
    return this._http.get<Card>(this._backendURL.getCardById.replace(":id", idCard));
  }
}
