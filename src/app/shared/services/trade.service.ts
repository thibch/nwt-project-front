import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Notification} from "../types/notification.type";
import {Trade} from "../types/trade.type";

@Injectable({
  providedIn: 'root'
})
export class TradeService {

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
   * Function to fetch all trades by waiting user id
   */
  getAllTradeByWaitingId(id: string): Observable<Trade[]> {
    return this._http.get<Trade[]>(this._backendURL.allTradeByWaitingId.replace(":id", id));
  }

  /**
   * Function to fetch all trades by second user id
   */
  getAllTradeBySecondId(id: string): Observable<Trade[]> {
    return this._http.get<Trade[]>(this._backendURL.allTradeBySecondId.replace(":id", id));
  }
}
