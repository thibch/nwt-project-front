import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Constructor of the authentification interceptor
   *
   * @param _storageService {StorageService} service wich manage tokens and users storage
   */
  constructor(private _storageService: StorageService) {
  }

  /**
   * Method to intercept request that the app make to add a header with the auth token
   *
   * @param request {HttpRequest<any>} request wich is make
   * @param next {HttpHandler} httphandler
   *
   * @return {Observable<HttpEvent<any>>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = request;
    if (this._storageService.getToken() != null) {
      auth = request.clone({headers: request.headers.set("Authorization", 'Bearer ' + this._storageService.getToken())})
    }
    return next.handle(auth);
  }
}
