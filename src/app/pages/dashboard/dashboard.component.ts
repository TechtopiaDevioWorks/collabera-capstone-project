import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Training, MinTraining, TrainingRegistrationMax } from '@core/interfaces/training';
import { TrainingService } from '@core/services/training.service';
import { UserService } from '@core/services/user.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  querySubscription: Subscription | null = null;
  activeTrainingList: Training[] | MinTraining[] = [];
  recentTrainingList: Training[] | MinTraining[] = [];
  upcomingTrainingList: Training[] | MinTraining[] = [];
  activeTrainingListLength = 0;
  recentTrainingListLength = 0;
  upcomingTrainingListLength = 0;
  userTrainingRegistrationList: TrainingRegistrationMax[] = [];
  userRoleId: number | null = null;
  currentDate = moment();
  pageNumberActive = 0;
  pageSizeActive = 3;
  pageNumberRecent= 0;
  pageSizeRecent = 3;
  pageNumberUpcoming= 0;
  pageSizeUpcoming = 3;
  constructor(
    private _user: UserService,
    private _router: Router,
    private _toast: ToastrService,
    private _route: ActivatedRoute,
    private _training: TrainingService
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
    this.initTrainings();
  }

  async initTrainings() {
    const userRole = await this._user.getUserRole();
    this.userRoleId = userRole ? userRole.id : null;
    if(this.userRoleId === 1) this.initUserTrainingRegistrationList();
    else {this.refreshList();}
  }

  async initUserTrainingRegistrationList() {
    const currentUser = this._user.getUserInfo();
    if(!currentUser) return;
    const userTrainingRegistrationList = await this._user.getTrainingHistory(currentUser.id, false);
    if(typeof userTrainingRegistrationList === 'string') {
      console.error(userTrainingRegistrationList);
    } else {
      this.userTrainingRegistrationList =  userTrainingRegistrationList;
      this.refreshList();
    }
  }

  async trainingRefreshed(list: 'active'|'recent'|'upcoming') {
    switch (list) {
      case 'active':
        this.refreshActiveTrainingListLength();
        this.refreshActiveTrainingList();
        break;
      case 'recent':
        this.refreshRecentTrainingListLength();
        this.refreshRecentTrainingList();
        break;
      case 'upcoming':
        this.refreshUpcomingTrainingListLength();
        this.refreshUpcomingTrainingList();
        break;
    }
  }
  
  async refreshAllListLength() {
    this.refreshActiveTrainingListLength();
    this.refreshRecentTrainingListLength();
    this.refreshUpcomingTrainingListLength();
  }

  async refreshList() {
    this.refreshAllListLength();
    this.refreshActiveTrainingList();
    this.refreshRecentTrainingList();
    this.refreshUpcomingTrainingList();
  }

  async refreshActiveTrainingList() {
    if(this.userRoleId === 1) {
      const start = this.pageSizeActive * this.pageNumberActive;
      this.activeTrainingList = this.userTrainingRegistrationList.filter(e => {
        return e.status.id !== 2 && e.training.startDate.isSameOrBefore(this.currentDate, 'd') && e.training.endDate.isSameOrAfter(this.currentDate, 'd')
      }).map(e => e.training).sort((a,b,) => a.startDate.isBefore(b.startDate)? -1:1).slice(start, start+this.pageSizeActive)
    } else {
      const activeTrainingList = await this._training.getTrainingListFiltered(
        null,
        this.currentDate,
        this.currentDate,
        null,
        this.pageSizeActive,
        this.pageNumberActive
      );
      if (typeof activeTrainingList === 'string') {
        console.error(activeTrainingList);
      } else {
        this.activeTrainingList = activeTrainingList;
      }
    }
  }

  async refreshRecentTrainingList() {
    if(this.userRoleId === 1) {
      const start = this.pageSizeRecent * this.pageNumberRecent;
      this.recentTrainingList = this.userTrainingRegistrationList.filter(e => {
        return e.training.endDate.isAfter(this.currentDate.clone().add(-15, 'days')) && e.training.startDate.isBefore(this.currentDate, 'd') && e.training.endDate.isBefore(this.currentDate, 'd')
      }).map(e => e.training).sort((a,b,) => a.startDate.isBefore(b.startDate)? -1:1).slice(start, start+this.pageSizeRecent)
    } else {
      const recentTrainingList = await this._training.getTrainingListFiltered(
        null,
        null,
        this.currentDate.clone().add(-15, 'days'),
        this.currentDate.clone().add(-1, 'days'),
        this.pageSizeRecent,
        this.pageNumberRecent
      );
      if (typeof recentTrainingList === 'string') {
        console.error(recentTrainingList);
      } else {
        this.recentTrainingList = recentTrainingList;
      }
    }
  }

  async refreshUpcomingTrainingList() {
    if(this.userRoleId === 1) {
      const start = this.pageSizeUpcoming * this.pageNumberUpcoming;
      this.upcomingTrainingList = this.userTrainingRegistrationList.filter(e => {
        return e.training.startDate.isAfter(this.currentDate, 'd') && e.training.endDate.isAfter(this.currentDate, 'd')
      }).map(e => e.training).sort((a,b,) => a.startDate.isBefore(b.startDate)? -1:1).slice(start, start+this.pageSizeUpcoming)
    } else {
      const upcomingTrainingList = await this._training.getTrainingListFiltered(
        this.currentDate.clone().add(1, 'day'),
        null,
        null,
        null,
        this.pageSizeUpcoming,
        this.pageNumberUpcoming
      );
      if (typeof upcomingTrainingList === 'string') {
        console.error(upcomingTrainingList);
      } else {
        this.upcomingTrainingList = upcomingTrainingList;
      }
    }
  }


  async refreshActiveTrainingListLength() {
    if(this.userRoleId === 1) {
      this.activeTrainingListLength = this.userTrainingRegistrationList.filter(e => {
        return e.status.id !== 2 && e.training.startDate.isSameOrBefore(this.currentDate, 'd') && e.training.endDate.isSameOrAfter(this.currentDate, 'd')
      }).length
    } else {
      const activeTrainingListLength = await this._training.getTrainingListFilteredLength(
        null,
        this.currentDate,
        this.currentDate,
        null,
      );
      if (typeof activeTrainingListLength === 'string') {
        console.error(activeTrainingListLength);
      } else {
        this.activeTrainingListLength = activeTrainingListLength;
      }
    }
  }

  async refreshRecentTrainingListLength() {
    if(this.userRoleId === 1) {
      this.recentTrainingListLength = this.userTrainingRegistrationList.filter(e => {
        return e.training.endDate.isAfter(this.currentDate.clone().add(-15, 'days')) && e.training.startDate.isBefore(this.currentDate, 'd') && e.training.endDate.isBefore(this.currentDate, 'd')
      }).length
    } else {
      const recentTrainingListLength = await this._training.getTrainingListFilteredLength(
        null,
        null,
        this.currentDate.clone().add(-15, 'days'),
        this.currentDate.clone().add(-1, 'days'),
      );
      if (typeof recentTrainingListLength === 'string') {
        console.error(recentTrainingListLength);
      } else {
        this.recentTrainingListLength = recentTrainingListLength;
      }
    }
  }

  async refreshUpcomingTrainingListLength() {
    if(this.userRoleId === 1) {
      this.upcomingTrainingListLength = this.userTrainingRegistrationList.filter(e => {
        return e.training.startDate.isAfter(this.currentDate, 'd') && e.training.endDate.isAfter(this.currentDate, 'd')
      }).length
    } else {
      const upcomingTrainingListLength = await this._training.getTrainingListFilteredLength(
        this.currentDate.clone().add(1, 'day'),
        null,
        null,
        null,
      );
      if (typeof upcomingTrainingListLength === 'string') {
        console.error(upcomingTrainingListLength);
      } else {
        this.upcomingTrainingListLength = upcomingTrainingListLength;
      }
    }
  }

  onPaginatorActiveChange(e: PageEvent) {
    this.pageNumberActive = e.pageIndex;
    this.pageSizeActive = e.pageSize;
    this.refreshActiveTrainingList();
  }

  onPaginatorRecentChange(e: PageEvent) {
    this.pageNumberRecent = e.pageIndex;
    this.pageSizeRecent = e.pageSize;
    this.refreshRecentTrainingList();
  }

  onPaginatorUpcomingChange(e: PageEvent) {
    this.pageNumberUpcoming = e.pageIndex;
    this.pageSizeUpcoming = e.pageSize;
    this.refreshUpcomingTrainingList();
  }

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
      this.querySubscription = null;
    }
  }
}
