import {Injectable, OnDestroy} from "@angular/core";
import {User} from "../types/user.type";
import {Observable, Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy{

  private _subjectUser: Subject<any>;

  constructor() {
    this._subjectUser = new Subject();
  }

  get subjectUser(): Subject<any> {
    return this._subjectUser;
  }

  ngOnDestroy(): void {
  }

  saveToken(token: string){
    window.sessionStorage.removeItem('auth-token');
    window.sessionStorage.setItem('auth-token', token);
    this._subjectUser.next(true);
  }

  saveUser(user: User | undefined){
    window.sessionStorage.removeItem('auth-user');
    window.sessionStorage.setItem('auth-user', JSON.stringify(user));
    this._subjectUser.next(true);
  }

  getUser(): User{
    const user = window.sessionStorage.getItem('auth-user');
    return user ? JSON.parse(user) : {};
  }

  getToken(): string | null{
    return window.sessionStorage.getItem('auth-token');
  }

  logout() {
    window.sessionStorage.removeItem('auth-token');
    window.sessionStorage.removeItem('auth-user');
  }
}
