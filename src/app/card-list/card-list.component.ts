import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../shared/types/card.type";
import {CardService} from "../shared/services/card.service";
import {Collection} from "../shared/types/collection.type";
import {from} from "rxjs";
import {filter, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  private _cards: Card[];

  constructor(private _cardsService: CardService) {
    this._cards = [];
    this._collections = [];
  }

  private _collections: Collection[];

  get collections(): Collection[] {
    return this._collections;
  }

  @Input("collections")
  set collections(value: Collection[]) {
    this._collections = value;

    if (this.collections != null)
      from(this._collections).pipe(
        filter((collection: Collection) => !!collection),
        mergeMap((collection: Collection) => this._cardsService.fetchById(collection.idCard)),
      ).subscribe({
        next: (card: Card) => this._cards.push(card)
      })


  }

  get cards(): Card[] {
    return this._cards;
  }

  set cards(value: Card[]) {
    this._cards = value;
  }

  ngOnInit(): void {
    this._collections = [];
  }
}
