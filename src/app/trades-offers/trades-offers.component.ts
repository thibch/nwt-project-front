import {Component, Input, OnInit} from '@angular/core';
import {Trade} from "../shared/types/trade.type";

@Component({
  selector: 'app-trades-offers',
  templateUrl: './trades-offers.component.html',
  styleUrls: ['./trades-offers.component.css']
})
export class TradesOffersComponent implements OnInit {


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
