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
  private _buttonClicked: boolean;
  private readonly _cards: Card[];

  constructor(private _collectionService: CollectionService, private _cardService: CardService) {
    this._buttonClicked = false;
    this._cards = [] as Card[];
  }

  ngOnInit(): void {
  }

  roll(): void { // TODO : ADD NEW ROUTE : CHECK IF THE USER HAS HIS ROLL AVAILABLE
    console.log('ROLL')
    this._collectionService.roll().subscribe(data => {

      data.forEach(collec => {
        this._cardService.getById(collec.idCard).subscribe( value => {
          this._cards.push(value);
        });
        })

      this._buttonClicked = true;
    })

  }

  get buttonClicked(): boolean {
    return this._buttonClicked;
  }

  get cards(): Card[] {
    return this._cards;
  }

}
