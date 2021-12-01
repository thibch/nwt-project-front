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

  constructor(private _tradeService: TradeService, private _storageService: StorageService) {
    this._myTradeOffer = [];
    this._tradeOffer = [];
  }

  private _myTradeOffer: Trade[];

  get myTradeOffer(): Trade[] {
    return this._myTradeOffer;
  }

  private _tradeOffer: Trade[];

  get tradeOffer(): Trade[] {
    return this._tradeOffer;
  }

  ngOnInit(): void {
    this._tradeService.getAllTradeBySecondId(this._storageService.getUser().id as string).subscribe(
      (data: Trade[]) => {
        this._tradeOffer = data;
      }
    );

    this._tradeService.getAllTradeByWaitingId(this._storageService.getUser().id as string).subscribe(
      (data: Trade[]) => {
        this._myTradeOffer = data;
      }
    );
  }

}
