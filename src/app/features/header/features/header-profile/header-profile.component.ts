import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit, OnDestroy {
  dropdownOpened = false;
  currentUser: User | null = null;
  userSubscription: Subscription | null = null;
  constructor(private _user: UserService) {}

  ngOnInit(): void {
    this.userSubscription = this._user.loginStatus.subscribe((status) => {
      if(status) {
        this.currentUser = this._user.getUserInfo();
      } else {
        this.currentUser = null;
      }
    })
  }

  ngOnDestroy(): void {
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
      this.userSubscription = null;
    }  
  }

	onLogoutClick() {
    this._user.logout('logout');
	}
}
