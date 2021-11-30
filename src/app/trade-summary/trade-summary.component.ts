import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CardsTradeComponent} from "../cards-trade/cards-trade.component";
import {Trade} from "../shared/types/trade.type";

@Component({
  selector: 'app-trade-summary',
  templateUrl: './trade-summary.component.html',
  styleUrls: ['./trade-summary.component.css']
})
export class TradeSummaryComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<CardsTradeComponent>, @Inject(MAT_DIALOG_DATA) private _data: { trade: Trade }) {
    this._trade = _data.trade;
  }

  private _trade: Trade;

  get trade(): Trade {
    return this._trade;
  }

  ngOnInit(): void {
  }

  redirectBack() {
    this._dialogRef.close();
  }

  purpose() {
    this._dialogRef.close(this._trade);
  }

}
