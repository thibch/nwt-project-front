import {Injectable, OnDestroy} from "@angular/core";
import {User} from "../types/user.type";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {

  /**
   * Constructor of the storage service
   */
  constructor() {
    this._subjectUser = new Subject();
  }

  /// Logged in user
  private _subjectUser: Subject<any>;

  /**
   * Getter of the user subject
   *
   * @return {Subject<any>}
   */
  get subjectUser(): Subject<any> {
    return this._subjectUser;
  }

  /**
   * On Destroy implementation
   */
  ngOnDestroy(): void {
  }

  /**
   * Function to save token in localstorage
   *
   * @param token {string} id to store
   */
  saveToken(token: string) {
    window.sessionStorage.removeItem('auth-token');
    window.sessionStorage.setItem('auth-token', token);
    this._subjectUser.next(true);
  }

  /**
   * Method to save user in localstorage
   *
   * @param user {User|undefined} user to save in localstorage
   */
  saveUser(user: User | undefined) {
    window.sessionStorage.removeItem('auth-user');
    window.sessionStorage.setItem('auth-user', JSON.stringify(user));
    this._subjectUser.next(true);
  }

  /**
   * Method to get user from localstorage
   *
   * @return {User}
   */
  getUser(): User {
    const user = window.sessionStorage.getItem('auth-user');
    return user ? JSON.parse(user) : {};
  }

  /**
   * Method to get token from localstorage
   *
   * @return {string | null}
   */
  getToken(): string | null {
    return window.sessionStorage.getItem('auth-token');
  }

  /**
   * Method to logout, wich remove both auth token et auth user
   */
  logout() {
    window.sessionStorage.removeItem('auth-token');
    window.sessionStorage.removeItem('auth-user');
  }
}
