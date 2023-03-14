import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
	mobileState = false;
	isHrOrManager = false;
	userSubscription: Subscription | null = null;

	constructor(private _user: UserService) {}

	ngOnInit(): void {
		this.userSubscription = this._user.loginStatus.subscribe((status) => {
			this.initUserPermission();
		})
	}

	ngOnDestroy(): void {
		if(this.userSubscription) {
			this.userSubscription.unsubscribe();
			this.userSubscription = null;
		}
	}

	initUserPermission() {
		const user = this._user.getUserInfo();
		if(user) {
			if(user.role.id === 2 || user.role.id === 3) 
			this.isHrOrManager = true;
		}
	}

	toggleMobileNavigation() {
		this.mobileState = !this.mobileState;
	}
}
