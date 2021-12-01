import {Component, Input, OnInit} from '@angular/core';
import {Trade} from "../shared/types/trade.type";

@Component({
  selector: 'app-trades-offers',
  templateUrl: './trades-offers.component.html',
  styleUrls: ['./trades-offers.component.css']
})
export class TradesOffersComponent implements OnInit {

  /**
   * Constructor of the trades offer component
   */
  constructor() {
    this._tradesOffers = [];
  }

  /// List of all trades offers to display
  private _tradesOffers: Trade[]

  /**
   * Getter of the trades offers to display
   *
   * @return {Trade[]}
   */
  get tradesOffers(): Trade[] {
    return this._tradesOffers;
  }

  /**
   * Setter of the trades offers to display
   *
   * @param value {Trade[]} trades to display
   */
  @Input("tradesOffers")
  set tradesOffers(value: Trade[]) {
    this._tradesOffers = value;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
  }
}
