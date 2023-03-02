import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy{
  routerSubscription: Subscription | null = null;
  headerVisible = false;
  constructor(private _router: Router) {
    this.routerSubscription = this._router.events.subscribe((e) => {
      if(e instanceof NavigationEnd) {
        if(e.urlAfterRedirects.startsWith('/login') || e.urlAfterRedirects.startsWith('/register')) {
          this.headerVisible = false;
        } else {
          this.headerVisible = true;
        }
      }
    })
  }
  ngOnDestroy(): void {
    if(this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }
  }
}
