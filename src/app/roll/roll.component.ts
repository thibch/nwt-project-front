import { Component, OnInit } from '@angular/core';
import {Card} from "../shared/types/card.type";
import {CollectionService} from "../shared/services/collection.service";
import {CardService} from "../shared/services/card.service";

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.css']
})
export class RollComponent implements OnInit {
  private _hasRolled: boolean;
  private _cards: Card[];

  constructor(private _collectionService: CollectionService, private _cardService: CardService) {
    this._hasRolled = false;
    this._cards = [] as Card[];
  }

  ngOnInit(): void {
    // TODO : ADD NEW ROUTE : CHECK IF THE USER HAS HIS ROLL AVAILABLE
  }

  roll(): void {
    this._collectionService.roll().subscribe({ next: data => {
      this._cards = [] as Card[];

      if (data && data.length && data.length > 0) {
        data.forEach(collec => {
          this._cardService.getById(collec.idCard).subscribe( value => {
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
