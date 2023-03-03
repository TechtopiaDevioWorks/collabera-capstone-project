import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  MinTraining,
  Training,
  TrainingFilter,
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
  constructor(private _user: UserService, private _training: TrainingService) {}

  ngOnInit(): void {
    this.initTrainings();
  }

  async initTrainings() {
    const userRole = await this._user.getUserRole();
    this.userRoleId = userRole ? userRole.id : null;
    this.onFilterChange(this.filterInfo);
  }

  async onFilterChange(newFilter: TrainingFilter) {
    this.filterInfo = newFilter;
    this.trainingListLength = await this._training.getTrainingListLength(
      this.filterInfo.minDate ?? null,
      this.filterInfo.maxDate ?? null,
      this.filterInfo.applicants ?? null
    );
    this.pageNumber = 0;
    await this.refreshList();
  }

  async refreshList() {
    this.trainingList = await this._training.getTrainingList(
      this.filterInfo.minDate ?? null,
      this.filterInfo.maxDate ?? null,
      this.filterInfo.applicants ?? null,
      this.pageSize,
      this.pageNumber
    );
  }

  onPaginatorChange(e: PageEvent) {
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.refreshList();
  }
}
