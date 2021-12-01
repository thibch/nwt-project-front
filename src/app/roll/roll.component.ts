import { Component, OnInit } from '@angular/core';
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
  private _hasRolled: boolean;
  private _cards: Card[];
  private _user: User;

  constructor(private _collectionService: CollectionService,
              private _cardService: CardService,
              private _storageService: StorageService) {
    this._hasRolled = false;
    this._cards = [] as Card[];
    this._user = {} as User;
  }

  ngOnInit(): void {

    this._user = this._storageService.getUser()
    // TODO : ADD NEW ROUTE : CHECK IF THE USER HAS HIS ROLL AVAILABLE
  }

  roll(): void {
    this._collectionService.roll(this._user.id).subscribe({ next: data => {
      this._cards = [] as Card[];

      let i = 1;

      if (data && data.length && data.length > 0) {
        data.forEach( async collec => {
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

  get hasRolled(): boolean {
    return this._hasRolled;
  }

  get cards(): Card[] {
    return this._cards;
  }

}
