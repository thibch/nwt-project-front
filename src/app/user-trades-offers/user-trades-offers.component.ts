import {Component, Input, OnInit} from '@angular/core';
import {Trade} from "../shared/types/trade.type";

@Component({
  selector: 'app-user-trades-offers',
  templateUrl: './user-trades-offers.component.html',
  styleUrls: ['./user-trades-offers.component.css']
})
export class UserTradesOffersComponent implements OnInit {

  /**
   * Constructor of the user trade offers component
   */
  constructor() {
    this._tradesOffers = [];
  }

  /// List of all trades offer to display
  private _tradesOffers: Trade[]

  /**
   * Getter of the trade list
   *
   * @return  {Trade[]} list of trades
   */
  get tradesOffers(): Trade[] {
    return this._tradesOffers;
  }

  /**
   * Setter of the list of offers to display
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
