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

  constructor(private _cardsService: CardService) {
    this._cards = [];
    this._tradable = false;
    this._cardOwner = {} as User;
    this._collections = [];
    this._tradeOffer$ = new EventEmitter<Card>();
  }

  private _tradable: boolean;

  get tradable(): boolean {
    return this._tradable;
  }

  @Input("tradable")
  set tradable(value: boolean) {
    this._tradable = value;
  }

  private _cardOwner: User;

  get cardOwner(): User {
    return this._cardOwner;
  }

  @Input("cardOwner")
  set cardOwner(value: User) {
    this._cardOwner = value;
  }

  private _cards: { card: Card; collection: Collection }[];

  private _collections: Collection[];

  get collections(): Collection[] {
    return this._collections;
  }

  get cards(): { card: Card; collection: Collection }[] {
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
          return this._cardsService.fetchById(collection.idCard).pipe((card: Observable<Card>) => {
            return card;
          })
        }),
      ).subscribe({
        next: (card: Card) => {
          this._cards.push({card: card, collection: this.collections[i++]})
        }
      })

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

