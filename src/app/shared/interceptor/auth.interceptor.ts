import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {StorageService} from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _storageService: StorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = request;
    if(this._storageService.getToken()!=null){
      auth = request.clone({headers: request.headers.set("Authorization",'Bearer '+this._storageService.getToken())})
    }
    return next.handle(auth);
  }
}
