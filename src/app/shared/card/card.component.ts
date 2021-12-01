import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../types/card.type";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CardsTradeComponent} from "../../cards-trade/cards-trade.component";
import {Collection} from "../types/collection.type";
import {filter, map} from "rxjs/operators";
import {User} from "../types/user.type";
import {Trade} from "../types/trade.type";
import {StorageService} from "../services/storage.service";
import {TradeSummaryComponent} from "../../trade-summary/trade-summary.component";
import {TradeService} from "../services/trade.service";
import {NotificationsService} from "../services/notifications.service";
import {Notification} from "../types/notification.type";
import {CollectionService} from "../services/collection.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  /// Mat dialog reference to the card trade component to open if the card is going to be trade
  private _tradeDialog: MatDialogRef<CardsTradeComponent, Card>;

  /// Mat dialog reference to the card trade summary component to open if the card is going to be trade
  private _tradeSummaryDialog: MatDialogRef<TradeSummaryComponent, Trade>;

  /// Event emitter when clicked with this component
  private readonly _tradeOffer$: EventEmitter<Card>;

  /// Card actually displayed by the component
  private _card: Card;

  /// User card owner of this card
  private _cardOwner: User;

  /// Collection containing this card
  private _collection: Collection;

  /// Boolean for the displaying of the card, if tradable, a button will appear
  private _tradable: boolean;

  /// Boolean for the displaying of the card, if the amount is enough, a button will appear
  private _suffisentAmount: boolean;

  /// Boolean for the displaying, if this card is currently in a trading operation (displayed in a trade summary), the trade button will not appear
  private _tradingOperation: boolean;

  /**
   * Constructor of a card component
   *
   * @param _dialog {MatDialog} dialog to open the trading form in
   * @param _collectionService {CollectionService} service managing collections
   * @param _storageService {StorageService} service managing tokens and users
   * @param _notificationService {NotificationsService} service managing notifications
   * @param _tradeService {TradeService} service managing trades
   */
  constructor(private _dialog: MatDialog, private _collectionService: CollectionService, private _storageService: StorageService, private _notificationService: NotificationsService, private _tradeService: TradeService) {
    this._card = {} as Card;
    this._tradeDialog = {} as MatDialogRef<CardsTradeComponent, Card>;
    this._tradeSummaryDialog = {} as MatDialogRef<TradeSummaryComponent, Trade>;
    this._cardOwner = {} as User;
    this._tradingOperation = false;
    this._suffisentAmount = false;
    this._tradable = false;
    this._collection = {} as Collection;
    this._tradeOffer$ = new EventEmitter<Card>();
  }

  /**
   * Getter of the card displayed
   *
   * @return {Card}
   */
  get card(): Card {
    return this._card;
  }

  /**
   * Setter of the displayed card
   *
   * @param value {Card} card
   */
  @Input('card')
  set card(value: Card) {
    this._card = value;
  }

  /**
   * Getter of the card owner
   *
   * @return {User} card owner
   */
  get cardOwner(): User {
    return this._cardOwner;
  }

  /**
   * Setter of the card owner
   *
   * @param value {User}
   */
  @Input("cardOwner")
  set cardOwner(value: User) {
    this._cardOwner = value;
  }

  /**
   * Getter of the collection
   *
   * @return {Collection}
   */
  get collection(): Collection {
    return this._collection;
  }

  /**
   * Setter of the collection
   *
   * @param value {Collection}
   */
  @Input("collection")
  set collection(value: Collection) {
    this._collection = value;
    this._suffisentAmount = this.collection.amount > this.collection.waiting;
  }

  /**
   * Getter of the tradable field
   *
   * @return {boolean} true if card is tradable, false either
   */
  get tradable(): boolean {
    return this._tradable;
  }

  /**
   * Setter of the tradable field
   *
   * @param value {boolean} true if tradable, false either
   */
  @Input("tradable")
  set tradable(value: boolean) {
    this._tradable = value;
  }

  /**
   * Getter of the suffisientAmount field
   *
   * @return {boolean} true if the amount is enough to be trade, false either
   */
  get suffisentAmount(): boolean {
    return this._suffisentAmount;
  }

  /**
   * Getter of the tradig operation field
   *
   * @return {boolean} true if the card is currently in a trading operation, false either
   */
  get tradingOperation(): boolean {
    return this._tradingOperation;
  }

  /**
   * Setter of TradingOperation field
   *
   * @param value {boolean} true if in a tradingoperation, false either
   */
  @Input("tradingOperation")
  set tradingOperation(value: boolean) {
    this._tradingOperation = value;
  }

  /**
   * Getter of the card owner
   *
   * @return {User}
   */
  get isCardOwner() {
    return this._cardOwner.id == this._storageService.getUser().id;
  }

  /**
   * Returns private property _tradeOffer$
   */
  @Output('tradeOffer') get tradeOffer$(): EventEmitter<Card> {
    return this._tradeOffer$;
  }

  /**
   * On Init implementation
   */
  ngOnInit(): void {
  }

  /**
   * Method wich build the trade dialog
   */
  buildTradeDialog() {
    // create modal with initial data inside
    this._tradeDialog = this._dialog.open(CardsTradeComponent, {
      width: '900px',
      disableClose: true
    });

    // after closing the dialog
    this._tradeDialog.afterClosed()
      .pipe(
        filter((card: Card | undefined) => !!card),
        map((card: Card | undefined) => {
          return card as Card;
        })
      ).subscribe(
      data => {
        // We create a trade and then we summarise it to the user

        let trade: Trade = {
          idCard: data.id,
          idCardWanted: this.card.id,
          idUserWaiting: this._storageService.getUser().id,
          idUser: this.cardOwner.id,
          accepted: false,
          creationTime: "2021-11-30T17:20:41.000+0100"
        } as Trade;

        this.buildTradeSummaryDialog(trade);
      });
  }

  /**
   * Method wich build a trade summary dialog
   *
   * @param trade {Trade} trade to summarise
   */
  buildTradeSummaryDialog(trade: Trade) {

    // create modal with initial data inside
    this._tradeSummaryDialog = this._dialog.open(TradeSummaryComponent, {
      width: '900px',
      disableClose: true,
      data: {trade: trade}
    });

    // when the dialog is close
    this._tradeSummaryDialog.afterClosed()
      .pipe(
        filter((trade: Trade | undefined) => !!trade),
        map((trade: Trade | undefined) => {
          return trade as Trade;
        })
      ).subscribe(
      data => {
        // if data returned, then we create a notification for the other user
        let notification: Notification = {
          read: false,
          accepted: false,
          creationTime: new Date().toISOString(),
          content: "Vous avez une nouvelle proposition d'échange !",
          type: "trade",
          idUser: trade.idUser
        } as Notification;

        // then we send the notification and create the trade
        this._notificationService.create(notification).subscribe(
          data => {
            this._tradeService.create(trade).subscribe(
              data => {
              },
              error => {
              }
            );
          },
          error => {
          });
      });
  }

  /**
   * On click on the card, emit a trade offer event
   *
   * @param card this card
   */
  tradeOffer(card: Card) {
    this._tradeOffer$.emit(card);
  }
}
