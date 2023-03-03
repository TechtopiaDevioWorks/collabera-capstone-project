import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  querySubscription: Subscription | null = null;
  constructor(
    private _user: UserService,
    private _router: Router,
    private _toast: ToastrService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.querySubscription = this._route.queryParams.subscribe((params) => {
      if (Object.hasOwn(params, 'loginSuccess')) {
        const user = this._user.getUserInfo();
        this._toast.info(`Welcome ${user?.firstname} ${user?.lastname}! Glad to have you back!`);
        this._router.navigate([], {
          queryParams: {
            'loginSuccess': null,
          },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        })
      }
    });
  }

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
      this.querySubscription = null;
    }
  }
}
