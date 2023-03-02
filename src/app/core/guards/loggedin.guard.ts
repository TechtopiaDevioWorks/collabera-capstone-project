import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoggedinGuard implements CanMatch {
  constructor(private _user: UserService, private _router: Router) {}
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const status = this._user.loginStatus.value;
    if (status) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
