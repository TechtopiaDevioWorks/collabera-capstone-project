import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotloggedinGuard implements CanMatch {
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
      this._router.navigate(['/dashboard'], {queryParams: {alreadyLoggedin: true}});
      return false;
    } else {
      return true;
    }
  }
}
