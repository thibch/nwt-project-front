import {Component, Input, OnInit} from '@angular/core';
import {Trade} from "../shared/types/trade.type";

@Component({
  selector: 'app-user-trades-offers',
  templateUrl: './user-trades-offers.component.html',
  styleUrls: ['./user-trades-offers.component.css']
})
export class UserTradesOffersComponent implements OnInit {

  private _tradesOffers : Trade[]

  constructor() {
    this._tradesOffers = [];
  }


  ngOnInit(): void {
  }


  get tradesOffers(): Trade[] {
    return this._tradesOffers;
  }

  @Input("tradesOffers")
  set tradesOffers(value: Trade[]) {
    this._tradesOffers = value;
  }
}
