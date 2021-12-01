import {Component, OnInit} from '@angular/core';
import {Collection} from "../shared/types/collection.type";
import {CollectionService} from "../shared/services/collection.service";
import {StorageService} from "../shared/services/storage.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CardComponent} from "../shared/card/card.component";
import {Card} from "../shared/types/card.type";

@Component({
  selector: 'app-cards-trade',
  templateUrl: './cards-trade.component.html',
  styleUrls: ['./cards-trade.component.css']
})
export class CardsTradeComponent implements OnInit {

  /**
   * Constructor of a component displaying all connected user tradable cards
   *
   * @param _dialogRef {MatDialogRef<CardComponent>} dialog reference
   * @param _collectionsService {CollectionService} service managing collections
   * @param _storageService {StorageService} service managing storage of token and connected user
   */
  constructor(private _dialogRef: MatDialogRef<CardComponent>, private _collectionsService: CollectionService, private _storageService: StorageService) {
    this._collectionsTradable = [];
  }

  /// List of collections wich can be used in a trade
  private _collectionsTradable: Collection[];

  /**
   * Getter of the tradable collections
   *
   * @return {Collection[]} list of all tradable collections wich can be displayed
   */
  get collectionsTradable(): Collection[] {
    return this._collectionsTradable;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
    this._collectionsService.getAllCollectionTradableById(this._storageService.getUser().id as string).subscribe({
      next: (collection: Collection[]) => this._collectionsTradable = collection
    });
  }

  /**
   * Method wich close the dialog if the user choose to cancel the trade proposition
   */
  redirectBack() {
    this._dialogRef.close();
  }

  /**
   * Close the dialog with the card to add to the trade
   *
   * @param $event {Card} to add to the trade
   */
  createTrade($event: Card) {
    this._dialogRef.close($event);
  }

  /**
   * Getter of the corrently connected user
   */
  getUser() {
    return this._storageService.getUser();
  }
}
