import {Component, Input, OnInit} from '@angular/core';
import {Trade} from "../types/trade.type";
import {User} from "../types/user.type";
import {Card} from "../types/card.type";
import {CardService} from "../services/card.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {TradeService} from "../services/trade.service";
import {Notification} from "../types/notification.type";
import {NotificationsService} from "../services/notifications.service";

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

  constructor(private _router: Router, private _cardService: CardService, private _notificationsService: NotificationsService, private _userService: UserService, private _tradeService: TradeService) {
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

  accept() {
    this._tradeService.accept(this.trade).subscribe(data => {
      let notification: Notification = {
        read: false,
        accepted: false,
        creationTime: "2021-11-30T17:20:41.000+0100",
        content: "Votre proposition d'échange avec " + this._secondUser.username + " pour la carte " + this.cardWanted.name + " a été acceptée !",
        type: "tradeAccept",
        idUser: this._trade.idUserWaiting
      } as Notification;


      this._notificationsService.create(notification).subscribe(
        data => {
          this._router.navigate(['/mycards'])
        });

    });
  }

  refuse() {
    this._tradeService.decline(this.trade).subscribe(data => {
      let notification: Notification = {
        read: false,
        accepted: false,
        creationTime: "2021-11-30T17:20:41.000+0100",
        content: "Votre proposition d'échange avec " + this._secondUser.username + " pour la carte " + this.cardWanted.name + " a été refusée !",
        type: "tradeDecline",
        idUser: this._trade.idUserWaiting
      } as Notification;


      this._notificationsService.create(notification).subscribe(
        data => {
          this._router.navigate(['/mycards'])
        });
    });


  }
}
