import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrOrManagerGuard implements CanMatch {
  constructor(private _user: UserService) {}
  
  async canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Promise<boolean | UrlTree> {
    const userRole = await this._user.getUserRole();
    if (userRole && (userRole.id === 3 || userRole.id === 2)) {
      return true;
    } else {
      return false;
    }
  }
}
