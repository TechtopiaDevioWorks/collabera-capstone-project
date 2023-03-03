import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotloggedinGuard implements CanMatch {
  constructor(private _user: UserService, private _router: Router) {}
  async canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Promise<boolean | UrlTree> {
    const status = await this._user.getLoginStatus();
    if (status) {
      this._router.navigate(['/dashboard'], {
        queryParams: { alreadyLoggedin: true },
      });
      return false;
    } else {
      return true;
    }
  }
}
