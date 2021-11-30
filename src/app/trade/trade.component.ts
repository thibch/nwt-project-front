import {Component, Input, OnInit} from '@angular/core';
import {Trade} from "../shared/types/trade.type";
import {User} from "../shared/types/user.type";
import {Card} from "../shared/types/card.type";
import {CardService} from "../shared/services/card.service";
import {UserService} from "../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  private _trade: Trade;

  private _tradeOwner: boolean;

  private _userWaiting: User;
  private _secondUser: User;
  private _cardWanted: Card;
  private _card: Card;

  constructor(private _router: Router, private _cardService: CardService, private _userService: UserService) {
    this._trade = {} as Trade;
    this._card = {} as Card;
    this._tradeOwner = false;
    this._cardWanted = {} as Card;
    this._userWaiting = {} as User;
    this._secondUser = {} as User;
  }


  get tradeOwner(): boolean {
    return this._tradeOwner;
  }

  @Input("tradeOwner")
  set tradeOwner(value: boolean) {
    this._tradeOwner = value;
  }

  ngOnInit(): void {
    this._cardService.fetchById(this._trade.idCard as string).subscribe(
      (data: Card) => {this._card = data;}
    );

    this._cardService.fetchById(this._trade.idCardWanted as string).subscribe(
      (data: Card) => {this._cardWanted = data;}
    );

    this._userService.fetchOne(this._trade.idUser as string).subscribe(
      (data: User) => {
        this._secondUser = data;
      }
    );

    this._userService.fetchOne(this._trade.idUserWaiting as string).subscribe(
      (data: User) => {
        this._userWaiting = data;
      }
    );
  }


  openProfile(user: User) {
    this._router.navigate(['/user/' + user.id + '/profile'])
  }

  get trade(): Trade {
    return this._trade;
  }

  @Input("trade")
  set trade(value: Trade) {
    this._trade = value;
  }


  get userWaiting(): User {
    return this._userWaiting;
  }

  set userWaiting(value: User) {
    this._userWaiting = value;
  }

  get secondUser(): User {
    return this._secondUser;
  }

  set secondUser(value: User) {
    this._secondUser = value;
  }

  get cardWanted(): Card {
    return this._cardWanted;
  }

  set cardWanted(value: Card) {
    this._cardWanted = value;
  }

  get card(): Card {
    return this._card;
  }

  set card(value: Card) {
    this._card = value;
  }
}
