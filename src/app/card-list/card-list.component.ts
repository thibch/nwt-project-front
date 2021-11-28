import { Component, OnInit } from '@angular/core';
import {Card} from "../shared/types/card.type";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  private _cards: Card[];


  constructor() {
    this._cards= {} as Card[];
  }

  ngOnInit(): void {
  }


  get cards(): Card[] {
    return this._cards;
  }

  set cards(value: Card[]) {
    this._cards = value;
  }
}
