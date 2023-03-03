import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from '@core/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanMatch {
  constructor(private _user: UserService) {}

  async canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Promise<boolean | UrlTree> {
    const userRoleId = await this._user.getUserRole();
    if (userRoleId === 2) {
      return true;
    } else {
      return false;
    }
  }
}
