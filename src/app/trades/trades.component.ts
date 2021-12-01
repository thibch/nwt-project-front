import {Component, OnInit} from '@angular/core';
import {Trade} from "../shared/types/trade.type";
import {TradeService} from "../shared/services/trade.service";
import {StorageService} from "../shared/services/storage.service";

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {

  /// List of all user trades offers
  private _myTradeOffer: Trade[];

  /// List of all user trades needing him action
  private _tradeOffer: Trade[];

  /**
   * Constructor of a trade
   *
   * @param _tradeService {TradeService} service to manage trades
   * @param _storageService {StorageService} service to manage tokens and users storage
   */
  constructor(private _tradeService: TradeService, private _storageService: StorageService) {
    this._myTradeOffer = [];
    this._tradeOffer = [];
  }

  /**
   * Getter of all user trades offers
   *
   * @return {Trade[]}
   */
  get myTradeOffer(): Trade[] {
    return this._myTradeOffer;
  }

  /**
   * Getter of all user trades wich need action from him
   *
   * return {Trade[]}
   */
  get tradeOffer(): Trade[] {
    return this._tradeOffer;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
    // Get all trade where the user need to do an action
    this._tradeService.getAllTradeBySecondId(this._storageService.getUser().id as string).subscribe(
      (data: Trade[]) => {
        this._tradeOffer = data;
      }
    );

    // Get all trade where the user is waiting
    this._tradeService.getAllTradeByWaitingId(this._storageService.getUser().id as string).subscribe(
      (data: Trade[]) => {
        this._myTradeOffer = data;
      }
    );
  }
}
