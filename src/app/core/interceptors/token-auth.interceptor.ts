import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '@core/services/user.service';

@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {

  constructor(private _user: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this._user.getUserInfo();
    if(user) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${user.token}` }
      })
    }
    return next.handle(request);
  }
}
