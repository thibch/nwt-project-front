import {Component, Input, OnInit} from '@angular/core';
import {Trade} from "../shared/types/trade.type";

@Component({
  selector: 'app-trades-offers',
  templateUrl: './trades-offers.component.html',
  styleUrls: ['./trades-offers.component.css']
})
export class TradesOffersComponent implements OnInit {


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
