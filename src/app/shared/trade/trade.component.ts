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

  /// Trade to display
  private _trade: Trade;

  /// Boolean to explain if the user wich is watching the displayed component is the owner of the trade or not
  private _tradeOwner: boolean;

  /// User wich is waiting for the other user to accept or decline the trade
  private _userWaiting: User;

  /// Second user of the trade wich need to accept or decline the trade
  private _secondUser: User;

  /// Card wanted by the trade owner
  private _cardWanted: Card;

  /// Card gived by the trade owner in exchange
  private _card: Card;

  /**
   * Constructor of the trade component
   *
   * @param _router {Router} router used to do redirections
   * @param _cardService {CardService} service managing cards
   * @param _notificationsService {NotificationsService} service managing notifications
   * @param _userService {UserService} service wich manage users
   * @param _tradeService {TradeService} service wich manage trades
   */
  constructor(private _router: Router, private _cardService: CardService, private _notificationsService: NotificationsService, private _userService: UserService, private _tradeService: TradeService) {
    this._trade = {} as Trade;
    this._card = {} as Card;
    this._tradeOwner = false;
    this._cardWanted = {} as Card;
    this._userWaiting = {} as User;
    this._secondUser = {} as User;
  }

  /**
   * Getter of the displayed trade
   *
   * @return {Trade}
   */
  get trade(): Trade {
    return this._trade;
  }

  /**
   * Setter of the displayed trade
   *
   * @param value {Trade} trade to disaplay
   */
  @Input("trade")
  set trade(value: Trade) {
    this._trade = value;
  }

  /**
   * Getter of the tradeOwner boolean
   *
   * @return {boolean} true if the trade is displayed to trade owner, false either
   */
  get tradeOwner(): boolean {
    return this._tradeOwner;
  }

  @Input('tradeOwner')
  /**
   * Setter of the tradeOwner boolean
   *
   * @param {boolean} true if the trade is displayed to trade owner, false either
   */
  set tradeOwner(value: boolean) {
    this._tradeOwner = value;
  }

  /**
   * Getter of the waiting user
   *
   * @return {User} waiting for the trade to be accepted or declined
   */
  get userWaiting(): User {
    return this._userWaiting;
  }

  /**
   * Getter of the second user
   *
   * @return {User} second wich need to accepte or decline
   */
  get secondUser(): User {
    return this._secondUser;
  }

  /**
   * Getter of the wanted card
   *
   * @return {Card} card wanted by the trade owner
   */
  get cardWanted(): Card {
    return this._cardWanted;
  }

  /**
   * Getter of the card gived by the trade owner
   *
   * @return {Card} card gived by the owner
   */
  get card(): Card {
    return this._card;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
    // get the card gived
    this._cardService.fetchById(this._trade.idCard as string).subscribe(
      (data: Card) => {
        this._card = data;
      }
    );

    // get the card wanted
    this._cardService.fetchById(this._trade.idCardWanted as string).subscribe(
      (data: Card) => {
        this._cardWanted = data;
      }
    );

    // get the second user
    this._userService.fetchOne(this._trade.idUser as string).subscribe(
      (data: User) => {
        this._secondUser = data;
      }
    );

    // get the trade owner
    this._userService.fetchOne(this._trade.idUserWaiting as string).subscribe(
      (data: User) => {
        this._userWaiting = data;
      }
    );
  }

  /**
   * Open user profile
   *
   * @param user {User} user to display profile
   */
  openProfile(user: User) {
    this._router.navigate(['/user/' + user.id + '/profile'])
  }

  /**
   * Method to accept a trade
   */
  accept() {
    // Accept the trade
    this._tradeService.accept(this.trade).subscribe(data => {
      // Create notification for the trade owner
      let notification: Notification = {
        read: false,
        accepted: false,
        creationTime: "2021-11-30T17:20:41.000+0100",
        content: "Votre proposition d'échange avec " + this._secondUser.username + " pour la carte " + this.cardWanted.name + " a été acceptée !",
        type: "tradeAccept",
        idUser: this._trade.idUserWaiting
      } as Notification;

      // Push notification to back and navigate back to card list
      this._notificationsService.create(notification).subscribe(
        data => {
          this._router.navigate(['/mycards'])
        });

    });
  }

  /**
   * Method to decline trade
   */
  refuse() {
    // Decline the trade
    this._tradeService.decline(this.trade).subscribe(data => {
      // Create notification for the trade owner
      let notification: Notification = {
        read: false,
        accepted: false,
        creationTime: "2021-11-30T17:20:41.000+0100",
        content: "Votre proposition d'échange avec " + this._secondUser.username + " pour la carte " + this.cardWanted.name + " a été refusée !",
        type: "tradeDecline",
        idUser: this._trade.idUserWaiting
      } as Notification;

      // Push notification, decline trade and navigate back to cards list
      this._notificationsService.create(notification).subscribe(
        data => {
          this._router.navigate(['/mycards'])
        });
    });
  }
}
