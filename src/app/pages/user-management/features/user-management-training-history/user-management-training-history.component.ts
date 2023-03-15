import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Training } from '@core/interfaces/training';
import { MinUser } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-management-training-history',
  templateUrl: './user-management-training-history.component.html',
  styleUrls: ['./user-management-training-history.component.scss'],
})
export class UserManagementTrainingHistoryComponent
  implements OnInit, OnDestroy
{
  routeParamSubscription: Subscription | null = null;
  userid: number | null = null;
  user: MinUser | null = null;
  pageSize = 10;
  pageNumber = 0;
  trainingListLength = 0;
  trainingList: Training[] = [];

  constructor(private _route: ActivatedRoute, private _user: UserService) {}

  ngOnInit(): void {
    this.routeParamSubscription = this._route.paramMap.subscribe(
      (params: ParamMap) => {
        const userid = params.get('userid');
        if (userid) {
          this.userid = parseInt(userid);
          this.initUser();
        } else {
          this.userid = null;
        }
      }
    );
  }

  async initUser() {
    if (!this.userid) return;
    const user = await this._user.getUserById(this.userid);
    if (typeof user === 'string') {
      console.error(user);
    } else {
      this.user = user;
    }
  }


  ngOnDestroy(): void {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
    }
  }

  onPaginatorChange(e: PageEvent) {
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    //this.refreshList();
  }
}
