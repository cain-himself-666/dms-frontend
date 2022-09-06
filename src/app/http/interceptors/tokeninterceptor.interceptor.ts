import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class TokeninterceptorInterceptor implements HttpInterceptor {

  constructor(private local_storage: LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.local_storage.getToken();
    if (token != null) {
      authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Token ' + token) });
    }
    return next.handle(authReq);
  }
}
export const tokenInterceptor = [
  { provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorInterceptor, multi: true }
];