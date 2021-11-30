import {Component, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {Collection} from "../shared/types/collection.type";
import {CollectionService} from "../shared/services/collection.service";
import {CardService} from "../shared/services/card.service";
import {StorageService} from "../shared/services/storage.service";

@Component({
  selector: 'app-my-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  constructor(private _storageService: StorageService, private _collectionService: CollectionService, private _cardService: CardService) {
    this._user = _storageService.getUser() as User;
    this._collections = [];


    this._collectionService.getAllCollectionById(this.user.id as string).subscribe({
      next: (collection: Collection[]) => this._collections = collection
    });
  }

  private _user: User;

  get user(): User {
    return this._user;
  }

  private _collections: Collection[];

  get collections(): Collection[] {
    return this._collections;
  }

  ngOnInit(): void {
  }

}
