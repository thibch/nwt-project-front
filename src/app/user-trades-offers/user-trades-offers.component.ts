import {Component, Input, OnInit} from '@angular/core';
import {Trade} from "../shared/types/trade.type";

@Component({
  selector: 'app-user-trades-offers',
  templateUrl: './user-trades-offers.component.html',
  styleUrls: ['./user-trades-offers.component.css']
})
export class UserTradesOffersComponent implements OnInit {

  constructor() {
    this._tradesOffers = [];
  }

  private _tradesOffers: Trade[]

  get tradesOffers(): Trade[] {
    return this._tradesOffers;
  }

  @Input("tradesOffers")
  set tradesOffers(value: Trade[]) {
    this._tradesOffers = value;
  }

  ngOnInit(): void {
  }
}
