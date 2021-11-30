import { Component, OnInit } from '@angular/core';
import {Trade} from "../shared/types/trade.type";
import {TradeService} from "../shared/services/trade.service";
import {StorageService} from "../shared/services/storage.service";
import {pipe} from "rxjs";
import {defaultIfEmpty, map} from "rxjs/operators";

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {

  private _myTradeOffer : Trade[];
  private _tradeOffer: Trade[];

  constructor(private _tradeService: TradeService, private _storageService: StorageService) {
    this._myTradeOffer = [];
    this._tradeOffer = [];
  }


  get myTradeOffer(): Trade[] {
    return this._myTradeOffer;
  }

  get tradeOffer(): Trade[] {
    return this._tradeOffer;
  }

  ngOnInit(): void {
    this._tradeService.getAllTradeBySecondId(this._storageService.getUser().id as string).subscribe(
      (data: Trade[]) => {this._tradeOffer = data;}
    );

    this._tradeService.getAllTradeByWaitingId(this._storageService.getUser().id as string).subscribe(
      (data: Trade[]) =>  {this._myTradeOffer = data;}
    );
  }

}
