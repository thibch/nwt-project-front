import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
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

  /**
   * Function to create a new trade
   */
  create(trade: Trade): Observable<any> {
    return this._http.post<Trade>(this._backendURL.trades, trade, this._options());
  }

  /**
   * Function to accept a  trade
   */
  accept(trade: Trade): Observable<any> {
    return this._http.post<Trade>(this._backendURL.tradeAccept.replace(":id", trade.id), trade, this._options());
  }

  /**
   * Function to decline a trade
   */
  decline(trade: Trade): Observable<any> {
    return this._http.post<Trade>(this._backendURL.tradeDecline.replace(":id", trade.id), trade, this._options());
  }

  private _options(headerList: object = {}): any {
    return {headers: new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, headerList))};
  }


}
