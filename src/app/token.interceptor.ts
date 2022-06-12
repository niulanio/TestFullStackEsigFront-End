import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { json } from 'express';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = request.url;
    const t = localStorage.getItem('token')
    if(t && !url.endsWith('/oauth/token')){
      const token = JSON.parse(t)
      const jwt = token.access_token;
      request = request.clone({
        setHeaders:{
          Authorization: 'Bearer ' + jwt
        }
      })
    }
    
    return next.handle(request);
  }
}
