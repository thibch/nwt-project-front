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

  /// BackendURL with all urls of the backend to make request
  private readonly _backendURL: any;

  /**
   * Constructor of the Trade service
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
   * Function to fetch all trades by waiting user id
   *
   * @param id {string} id of the user waiting for the other user to accept in a trade
   * @eturn {Observable<Trade[]>} list of trade matching id
   */
  getAllTradeByWaitingId(id: string): Observable<Trade[]> {
    return this._http.get<Trade[]>(this._backendURL.allTradeByWaitingId.replace(":id", id));
  }

  /**
   * Function to fetch all trades by second user id
   *
   * @param id {string} id of the second user wich need to accept or decline the trade
   * @eturn {Observable<Trade[]>} list of trade matching id
   */
  getAllTradeBySecondId(id: string): Observable<Trade[]> {
    return this._http.get<Trade[]>(this._backendURL.allTradeBySecondId.replace(":id", id));
  }

  /**
   * Function to create a new trade
   *
   * @param trade {Trade} trade to create
   * @return {Observable<any>}
   */
  create(trade: Trade): Observable<any> {
    return this._http.post<Trade>(this._backendURL.trades, trade, this._options());
  }

  /**
   * Function to accept a  trade
   *
   * @param trade {Trade} trade to accept
   * @return {Observable<any>}
   */
  accept(trade: Trade): Observable<any> {
    return this._http.post<Trade>(this._backendURL.tradeAccept.replace(":id", trade.id), trade, this._options());
  }

  /**
   * Function to decline a trade
   *
   * @param trade {Trade} trade to decline
   * @return {Observable<any>}
   */
  decline(trade: Trade): Observable<any> {
    return this._http.post<Trade>(this._backendURL.tradeDecline.replace(":id", trade.id), trade, this._options());
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
