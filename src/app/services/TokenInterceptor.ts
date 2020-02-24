// src/app/auth/token.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        // 'Access-Control-Allow-Origin': '*',
        userid: this.authService.getUserId() ? this.authService.getUserId() : '',
        // email: this.authService.getUserEmail(),
        // password: this.authService.getSecret(),
      }
    });
    return next.handle(request);
  }
}
