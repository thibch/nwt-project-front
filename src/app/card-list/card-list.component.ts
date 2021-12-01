import {Component, OnInit, Output} from '@angular/core';
import {Card} from "../shared/types/card.type";
import {CardService} from "../shared/services/card.service";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  private _cards: Card[];


  constructor(private _cardsService: CardService) {
    this._cards= [];
    this._cardsService.fetch().subscribe(
      data => {console.log(data); this._cards = data }
    );



    console.log(this.cards)
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
