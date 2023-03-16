import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  MinTraining,
  Training,
  TrainingFilter,
  TrainingRegistrationMax,
} from '@core/interfaces/training';
import { TrainingService } from '@core/services/training.service';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
})
export class TrainingListComponent implements OnInit {
  filterInfo: TrainingFilter = {};
  trainingList: Training[] | MinTraining[] = [];
  pageSize = 10;
  pageNumber = 0;
  trainingListLength = 0;
  userRoleId: number | null = null;
  userTrainingRegistrationList: TrainingRegistrationMax[] = [];
  constructor(private _user: UserService, private _training: TrainingService) {}

  ngOnInit(): void {
    this.initTrainings();
  }

  async initTrainings() {
    const userRole = await this._user.getUserRole();
    this.userRoleId = userRole ? userRole.id : null;
    if(this.userRoleId === 1) this.initUserTrainingRegistrationList();
    this.onFilterChange(this.filterInfo);
  }

  async initUserTrainingRegistrationList() {
    const currentUser = this._user.getUserInfo();
    if(!currentUser) return;
    const userTrainingRegistrationList = await this._user.getTrainingHistory(currentUser.id, false);
    if(typeof userTrainingRegistrationList === 'string') {
      console.error(userTrainingRegistrationList);
    } else {
      this.userTrainingRegistrationList =  userTrainingRegistrationList;
    }
  }

  async onFilterChange(newFilter: TrainingFilter) {
    this.filterInfo = newFilter;
    const trainingListLength = await this._training.getTrainingListLength(
      this.filterInfo.minDate ?? null,
      this.filterInfo.maxDate ?? null,
      this.filterInfo.applicants ?? null
    );
    if(typeof trainingListLength === 'string') {
      console.error(trainingListLength);
    } else {
      this.trainingListLength =  trainingListLength;
    }
    this.pageNumber = 0;
    await this.refreshList();
  }

  async refreshList() {
    const trainingList = await this._training.getTrainingList(
      this.filterInfo.minDate ?? null,
      this.filterInfo.maxDate ?? null,
      this.filterInfo.applicants ?? null,
      this.pageSize,
      this.pageNumber
    );
    if (typeof trainingList === 'string') {
      console.error(trainingList);
    } else {
      this.trainingList = trainingList;
    }
  }

  onPaginatorChange(e: PageEvent) {
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.refreshList();
  }
}
