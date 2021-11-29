import {Component, Input, OnInit} from '@angular/core';
import {User} from "../shared/types/user.type";
import {from, merge, of, pipe} from "rxjs";
import {UserService} from "../shared/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, mergeMap, tap} from "rxjs/operators";
import {CollectionService} from "../shared/services/collection.service";
import {Collection} from "../shared/types/collection.type";
import {CardService} from "../shared/services/card.service";

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  private _user: User;
  private _collections: Collection[];

  constructor(private _route: ActivatedRoute, private _userService: UserService, private _collectionService: CollectionService, private _cardService: CardService) {
    this._user = {} as User;
    this._collections = [];
  }

  ngOnInit(): void {
    merge(
      this._route.params.pipe(
        filter((params: any) => !!params.id),
        mergeMap((params: any) => this._userService.fetchOne(params.id)),
      )
    ).subscribe({
      next: (user: User) => this._user = user,
      error: () => {
        this._user = {} as User;
      }
    });


    merge(
      this._route.params.pipe(
        filter((params: any) => !!params.id),
        mergeMap((params: any) => this._collectionService.getAllCollectionById(params.id as string)),
      )
    ).subscribe({
      next: (collection: Collection[]) => this._collections=collection
    });
  }

  get user(): User {
    return this._user;
  }

  @Input('user')
  set user(value: User) {
    this._user = value;
  }


  get collections(): Collection[] {
    return this._collections;
  }

  set collections(value: Collection[]) {
    this._collections = value;
  }
}
