import { Component } from '@angular/core';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent {

  constructor(private _user: UserService) {}

	onLogoutClick() {
    this._user.logout('logout');
	}
}
