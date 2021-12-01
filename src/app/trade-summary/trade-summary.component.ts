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

  /**
   * Constructor of the trade summary
   *
   * @param _dialogRef {MatDialogRef<CardsTradeComponent>} Reference to the parent
   * @param _data  {{ trade: Trade }} Data gived by the parent
   */
  constructor(private _dialogRef: MatDialogRef<CardsTradeComponent>, @Inject(MAT_DIALOG_DATA) private _data: { trade: Trade }) {
    this._trade = _data.trade;
  }

  /// Trade to display in the summary component
  private _trade: Trade;

  /**
   * Getter of the trade
   *
   * @return {Trade}
   */
  get trade(): Trade {
    return this._trade;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
  }

  /**
   * Method to close the dialog and cancel the trade
   */
  redirectBack() {
    this._dialogRef.close();
  }

  /**
   * Method to purpose the dialog and purpose the trade by giving the trade to parent
   */
  purpose() {
    this._dialogRef.close(this._trade);
  }

}
