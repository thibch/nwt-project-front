import {Component, Input, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {merge} from "rxjs";
import {UserService} from "../shared/services/user.service";
import {ActivatedRoute} from "@angular/router";
import {filter, mergeMap} from "rxjs/operators";
import {CollectionService} from "../shared/services/collection.service";
import {Collection} from "../shared/types/collection.type";
import {CardService} from "../shared/services/card.service";
import {StorageService} from "../shared/services/storage.service";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  /**
   * Constructor of an user profile
   *
   * @param _route {ActivatedRoute} used to get the id of the user displayed
   * @param _storageService {StorageService} service managing storage of tokens and users
   * @param _userService {UserService} service managing users
   * @param _collectionService {CollectionService} service managing collections
   * @param _cardService {CardService} service managing cards
   */
  constructor(private _route: ActivatedRoute, private _storageService: StorageService, private _userService: UserService, private _collectionService: CollectionService, private _cardService: CardService) {
    this._user = {} as User;
    this._collections = [];
  }

  /// List of all collections of the user
  private _collections: Collection[];

  /**
   * Getter of the list of collections
   *
   * @return {Collection[]}
   */
  get collections(): Collection[] {
    return this._collections;
  }

  /**
   * Setter of the list of collections
   *
   * @param value {Collection[]}
   */
  set collections(value: Collection[]) {
    this._collections = value;
  }

  /// User matching this profile
  private _user: User;

  /**
   * Getter of the user of this profile
   *
   * @return {User}
   */
  get user(): User {
    return this._user;
  }

  /**
   * Setter of the user
   *
   * @param value {User}
   */
  @Input('user')
  set user(value: User) {
    this._user = value;
  }

  /**
   * On init implementation
   */
  ngOnInit(): void {
    // Get the user matching the route id
    merge(
      this._route.params.pipe(
        filter((params: any) => !!params.id),
        mergeMap((params: any) => this._userService.fetchOne(params.id)),
      )
    ).subscribe({
      next: (user: User) => {
        this._user = user
      },
      error: () => {
        this._user = {} as User;
      }
    });

    // Get all collections matching the user id
    merge(
      this._route.params.pipe(
        filter((params: any) => !!params.id),
        mergeMap((params: any) => this._collectionService.getAllCollectionById(params.id as string)),
      )
    ).subscribe({
      next: (collection: Collection[]) => this._collections = collection
    });
  }
}
