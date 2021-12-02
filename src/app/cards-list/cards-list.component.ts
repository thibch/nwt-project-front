import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../shared/types/card.type";
import {CardService} from "../shared/services/card.service";
import {Collection} from "../shared/types/collection.type";
import {User} from "../shared/types/user.type";

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  /// EventEmitter when card is clicked (for the trade module)
  private readonly _tradeOffer$: EventEmitter<Card>;

  /**
   * Constructor of the component card list
   *
   * @param _cardsService {CardService} service managing cards
   */
  constructor(private _cardsService: CardService) {
    this._cards = new Map();
    this._tradable = false;
    this._cardOwner = {} as User;
    this._collections = [];
    this._tradeOffer$ = new EventEmitter<Card>();
  }

  /// Tradable boolean, used to know if the card provided by the list can be trade
  private _tradable: boolean;

  /**
   * Getter of the tradable field
   *
   * @return {boolean} True if the list displayed is tradable, false either
   */
  get tradable(): boolean {
    return this._tradable;
  }

  /**
   * Setter of the tradable field
   *
   * @param value {boolean} True if the list is tradable, false either
   */
  @Input("tradable")
  set tradable(value: boolean) {
    this._tradable = value;
  }

  /// User owner of the card printed (to know if the card can be trade)
  private _cardOwner: User;

  /**
   * Getter of the list owner
   */
  get cardOwner(): User {
    return this._cardOwner;
  }

  /**
   * Setter of the card list owner
   *
   * @param value {User} owner of the list
   */
  @Input("cardOwner")
  set cardOwner(value: User) {
    this._cardOwner = value;
  }

  /// Map of card to get the collection matching the card currently displayed
  private _cards: Map<Card, Collection>;

  /**
   * Getter of the map of card and collection
   *
   * @return {Map<Card, Collection>}
   */
  get cards(): Map<Card, Collection> {
    return this._cards;
  }

  /// Array of collections matching card currently displayed
  private _collections: Collection[];

  /**
   * Getter of the collections currently displayed by the card list
   *
   * @return {Collection[]}
   */
  get collections(): Collection[] {
    return this._collections;
  }

  /**
   * Setter of the collections field
   *
   * @param value {Collection[]} list of Collection displayed by the component
   */
  @Input("collections")
  set collections(value: Collection[]) {
    this._collections = value;

    let i: number = 0;

    // Get all the cards matching the collection to display
    if (!!this._collections && !!this._collections.length) {
      this.collections.map(
        (_) => {
          this._cardsService.fetchById(_.idCard).subscribe(
            value => {
              this._cards.set(value, _);
            }
          );
        }
      );
    }
  }

  /**
   * Returns private property _tradeOffer$
   *
   * @return {EventEmitter<Card>} if a card is clicked, this method emit the event
   */
  @Output('tradeOffer') get tradeOffer$(): EventEmitter<Card> {
    return this._tradeOffer$;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
  }

  /**
   * Emit a new trade offer
   *
   * @param card {Card} card selected for the trade
   */
  tradeOffer(card: Card) {
    this._tradeOffer$.emit(card);
  }
}

