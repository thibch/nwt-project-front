import {Component, OnInit} from '@angular/core';
import {User} from "../types/user.type";
import {Collection} from "../types/collection.type";
import {CollectionService} from "../services/collection.service";
import {CardService} from "../services/card.service";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-my-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {

  /// User owning card to display
  private _user: User;

  /// List of collection of the user
  private _collections: Collection[];

  /**
   * Constructor of the user cards component
   *
   * @param _storageService {StorageService} service managing tokens and users storage
   * @param _collectionService {CollectionService} service managing collections
   * @param _cardService {CardService} service managing cards
   */
  constructor(private _storageService: StorageService, private _collectionService: CollectionService, private _cardService: CardService) {
    this._user = _storageService.getUser() as User;
    this._collections = [];
  }

  /**
   * Getter of the user owning the cards
   *
   * @return {User}
   */
  get user(): User {
    return this._user;
  }

  /**
   * Getter of the collections of the user
   *
   * @return {Collection[]}
   */
  get collections(): Collection[] {
    return this._collections;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
    // On each init, get all user collections
    this._collectionService.getAllCollectionById(this.user.id as string).subscribe({
      next: (collection: Collection[]) => this._collections = collection
    });
  }
}
