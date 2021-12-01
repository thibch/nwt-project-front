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

  constructor(private _dialogRef: MatDialogRef<CardComponent>, private _collectionsService: CollectionService, private _storageService: StorageService) {
    this._collectionsTradable = [];
  }

  private _collectionsTradable: Collection[];

  get collectionsTradable(): Collection[] {
    return this._collectionsTradable;
  }

  ngOnInit(): void {


    this._collectionsService.getAllCollectionTradableById(this._storageService.getUser().id as string).subscribe({
      next: (collection: Collection[]) => this._collectionsTradable = collection
    });

  }

  redirectBack() {
    this._dialogRef.close();
  }

  createTrade($event: Card) {
    this._dialogRef.close($event);
  }

  getUser() {
    return this._storageService.getUser();
  }
}
