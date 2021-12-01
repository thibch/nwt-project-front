import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../shared/types/card.type";
import {CardService} from "../shared/services/card.service";
import {Collection} from "../shared/types/collection.type";
import {from, Observable} from "rxjs";
import {filter, mergeMap} from "rxjs/operators";
import {User} from "../shared/types/user.type";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  private readonly _tradeOffer$: EventEmitter<Card>;
  private _tradable: boolean;
  private _cardOwner: User;

  private _cards: Map<Card, Collection>;
  private _collections: Collection[];

  constructor(private _cardsService: CardService) {
    this._cards = new Map();
    this._tradable = false;
    this._cardOwner = {} as User;
    this._collections = [];
    this._tradeOffer$ = new EventEmitter<Card>();
  }

  @Input("collections")
  set collections(value: Collection[]) {
    this._collections = value;

    let i: number = 0;

    if (this._collections != null){
      from(this._collections).pipe(
        filter((collection: Collection) => !!collection),
        mergeMap((collection: Collection) => this._cardsService.fetchById(collection.idCard)),
      ).subscribe({
        next: (card: Card) => {
          this._cards.set(card, this.collections[i++]);
        }
      });
    }
  }


  get tradable(): boolean {
    return this._tradable;
  }

  @Input("tradable")
  set tradable(value: boolean) {
    this._tradable = value;
  }

  get cardOwner(): User {
    return this._cardOwner;
  }

  @Input("cardOwner")
  set cardOwner(value: User) {
    this._cardOwner = value;
  }

  get collections(): Collection[] {
    return this._collections;
  }

  get cards(): Map<Card, Collection> {
    return this._cards;
  }

  /**
   * Returns private property _tradeOffer$
   */
  @Output('tradeOffer') get tradeOffer$(): EventEmitter<Card> {
    return this._tradeOffer$;
  }

  ngOnInit(): void {

  }

  tradeOffer(card: Card) {
    this._tradeOffer$.emit(card);
  }
}

