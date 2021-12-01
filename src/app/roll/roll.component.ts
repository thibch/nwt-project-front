import {Component, OnInit} from '@angular/core';
import {Card} from "../shared/types/card.type";
import {CollectionService} from "../shared/services/collection.service";
import {CardService} from "../shared/services/card.service";
import {StorageService} from "../shared/services/storage.service";
import {User} from "../shared/types/user.type";

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.css']
})
export class RollComponent implements OnInit {

  /// User currently logged
  private _user: User;

  /// Boolean to know if the user have already roll today
  private _hasRolled: boolean;

  /// List of cards winned in the roll
  private _cards: Card[];

  /**
   * Constructor of the roll component
   *
   * @param _collectionService {CollectionService} service managing collections
   * @param _cardService {CardService} service managing cards
   * @param _storageService {StorageService} service managing tokens and users
   */
  constructor(private _collectionService: CollectionService,
              private _cardService: CardService,
              private _storageService: StorageService) {
    this._hasRolled = false;
    this._cards = [] as Card[];
    this._user = {} as User;
  }

  /**
   * Getter of the roll var to know if the user have already roll today
   */
  get hasRolled(): boolean {
    return this._hasRolled;
  }

  /**
   * Getter of the cards of the roll
   *
   * @return {Card[]}
   */
  get cards(): Card[] {
    return this._cards;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
    this._user = this._storageService.getUser()
    // TODO : ADD NEW ROUTE : CHECK IF THE USER HAS HIS ROLL AVAILABLE
  }

  /**
   * Metod used to roll card
   */
  roll(): void {
    this._collectionService.roll(this._user.id).subscribe({
      next: data => {
        this._cards = [] as Card[];
        let i = 1;

        // Getting each cards of the roll
        if (data && data.length && data.length > 0) {
          data.forEach(async collec => {
            this._cardService.fetchById(collec.idCard).subscribe(async value => {
              this._cards.push(value);
            });
          });
          this._hasRolled = true;
        }
      },
      error: () => {
        this._cards = [] as Card[];
        this._hasRolled = false;
      }
    });
  }
}
