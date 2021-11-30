import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../shared/types/card.type";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CardsTradeComponent} from "../cards-trade/cards-trade.component";
import {Collection} from "../shared/types/collection.type";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  private _card: Card;

  private _tradeDialog: MatDialogRef<CardsTradeComponent, Collection>;

  constructor(private _dialog: MatDialog) {
    this._card = {} as Card;
    this._tradeDialog = {} as MatDialogRef<CardsTradeComponent, Collection>;
    this._cardOwner = false;
    this._collection = {} as Collection;
  }

  private _collection: Collection;

  private _cardOwner: boolean;

  get cardOwner(): boolean {
    return this._cardOwner;
  }

  get collection(): Collection {
    return this._collection;
  }

  @Input("collection")
  set collection(value: Collection) {
    this._collection = value;
  }

  @Input("cardOwner")
  set cardOwner(value: boolean) {
    this._cardOwner = value;
  }


  ngOnInit(): void {
  }

  get card(): Card {
    return this._card;
  }

  @Input('card')
  set card(value: Card) {
    this._card = value;
  }

  trade() {
    // create modal with initial data inside
    this._tradeDialog = this._dialog.open(CardsTradeComponent, {
      width: '900px',
      disableClose: true
    });


  }
}
