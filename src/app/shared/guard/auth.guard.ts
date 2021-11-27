import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LoginService} from "../services/login.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //const currentUser = this.authenticationService.currentUserValue;
    //if (currentUser) {
    //  return true;
    //}

    this.router.navigate(['/login']);
    return false;
  }
}
