import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {StorageService} from "../services/storage.service";
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  /**
   * Constructor of the authentification guard
   *
   * @param _router {Router} to redirect to login if the user is not logged in
   * @param _storageService {StorageService} service to mangage tokens and users storage
   * @param _jwtHelper {JwtHelperService} service to manage jwt tokens
   */
  constructor(private _router: Router, private _storageService: StorageService, private _jwtHelper: JwtHelperService) {
  }

  /**
   * Method to check if the user can activate the route or not
   *
   * @param route {ActivatedRouteSnapshot} current route
   * @param state {RouterStateSnapshot} state of the route
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._storageService.getToken() && !this._jwtHelper.isTokenExpired(this._storageService.getToken() as string)) {
      return true;
    } else
      this._router.navigate(['/login']);
    return false;
  }
}
