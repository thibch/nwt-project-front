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

  private _card: Card;
  private _tradeDialog: MatDialogRef<CardsTradeComponent, Card>;
  private _tradeSummaryDialog: MatDialogRef<TradeSummaryComponent, Trade>;
  private readonly _tradeOffer$: EventEmitter<Card>;

  private _cardOwner: User;
  private _collection: Collection;
  private _tradable: boolean;
  private _suffisentAmount: boolean;
  private _tradingOperation: boolean;

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

  ngOnInit(): void {
    console.log('card :');
    console.log(this.tradable);
    console.log(this.tradingOperation);
    console.log(this.suffisentAmount);
  }

  get suffisentAmount(): boolean {
    return this._suffisentAmount;
  }

  get tradingOperation(): boolean {
    return this._tradingOperation;
  }

  @Input("tradingOperation")
  set tradingOperation(value: boolean) {
    this._tradingOperation = value;
  }

  get tradable(): boolean {
    return this._tradable;
  }

  @Input("tradable")
  set tradable(value: boolean) {
    this._tradable = value;
  }


  get cardOwner(): User {
    return this._cardOwner;
  }

  get collection(): Collection {
    return this._collection;
  }

  @Input("cardOwner")
  set cardOwner(value: User) {
    this._cardOwner = value;
  }

  get isCardOwner() {
    return this._cardOwner.id == this._storageService.getUser().id;
  }


  get card(): Card {
    return this._card;
  }

  @Input('card')
  set card(value: Card) {
    this._card = value;
  }

  @Input("collection")
  set collection(value: Collection) {
    this._collection = value;
    this._suffisentAmount = this.collection.amount > this.collection.waiting;
    console.log(value);
  }

  /**
   * Returns private property _tradeOffer$
   */
  @Output('tradeOffer') get tradeOffer$(): EventEmitter<Card> {
    return this._tradeOffer$;
  }

  buildTradeDialog() {
    // create modal with initial data inside
    this._tradeDialog = this._dialog.open(CardsTradeComponent, {
      width: '900px',
      disableClose: true
    });

    this._tradeDialog.afterClosed()
      .pipe(
        filter((card: Card | undefined) => !!card),
        map((card: Card | undefined) => {
          return card as Card;
        })
      ).subscribe(
      data => {
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

  buildTradeSummaryDialog(trade: Trade) {

    // create modal with initial data inside
    this._tradeSummaryDialog = this._dialog.open(TradeSummaryComponent, {
      width: '900px',
      disableClose: true,
      data: {trade: trade}
    });

    this._tradeSummaryDialog.afterClosed()
      .pipe(
        filter((trade: Trade | undefined) => !!trade),
        map((trade: Trade | undefined) => {
          return trade as Trade;
        })
      ).subscribe(
      data => {

        let notification: Notification = {
          read: false,
          accepted: false,
          creationTime: new Date().toISOString(),
          content: "Vous avez une nouvelle proposition d'échange !",
          type: "trade",
          idUser: trade.idUser
        } as Notification;


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

  tradeOffer(card: Card) {
    this._tradeOffer$.emit(card);
  }
}
