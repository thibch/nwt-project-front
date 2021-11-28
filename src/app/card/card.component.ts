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
  }

  ngOnInit(): void {
  }


  get card(): Card {
    return this._card;
  }

  @Input()
  set card(value: Card) {
    this._card = value;
  }
}
