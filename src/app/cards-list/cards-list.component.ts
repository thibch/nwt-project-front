import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../shared/types/card.type";
import {CardService} from "../shared/services/card.service";
import {Collection} from "../shared/types/collection.type";
import {from, Observable} from "rxjs";
import {filter, mergeMap} from "rxjs/operators";


@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  private _cardAmount: number[];

  constructor(private _cardsService: CardService) {
    this._cards = [];
    this._cardOwner = false;
    this._collections = [];
    this._cardAmount = [];
  }

  private _cardOwner: boolean;

  get cardOwner(): boolean {
    return this._cardOwner;
  }

  @Input("cardOwner")
  set cardOwner(value: boolean) {
    this._cardOwner = value;
  }

  private _cards: { card: Card, amount: number }[];

  private _collections: Collection[];

  get collections(): Collection[] {
    return this._collections;
  }

  get cards(): { card: Card; amount: number }[] {
    return this._cards;
  }

  @Input("collections")
  set collections(value: Collection[]) {
    this._collections = value;

    let i: number = 0;

    if (this.collections != null)
      from(this._collections).pipe(
        filter((collection: Collection) => !!collection),
        mergeMap((collection: Collection) => {
          this._cardAmount.push(collection.amount);
          return this._cardsService.fetchById(collection.idCard).pipe((card: Observable<Card>) => {
            return card;
          })
        }),
      ).subscribe({
        next: (card: Card) => {
          this._cards.push({card: card, amount: this._cardAmount[i++]})
        }
      })
  }

  ngOnInit(): void {

  }
}

