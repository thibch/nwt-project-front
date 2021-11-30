import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../shared/types/card.type";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  private _card: Card;

  constructor() {
    this._card = {} as Card;
    this._amount = 1;
    this._cardOwner = false;
  }

  private _cardOwner: boolean;

  get cardOwner(): boolean {
    return this._cardOwner;
  }

  @Input("cardOwner")
  set cardOwner(value: boolean) {
    this._cardOwner = value;
  }

  private _amount: number;

  ngOnInit(): void {
  }

  get amount(): number {
    return this._amount;
  }

  @Input('amount')
  set amount(value: number) {
    this._amount = value;
  }

  get card(): Card {
    return this._card;
  }

  @Input('card')
  set card(value: Card) {
    this._card = value;
  }

  trade() {

  }
}
