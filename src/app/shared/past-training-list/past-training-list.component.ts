import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TrainingRegistrationMax } from '@core/interfaces/training';
import { MinUser, User } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-past-training-list',
  templateUrl: './past-training-list.component.html',
  styleUrls: ['./past-training-list.component.scss'],
})
export class PastTrainingListComponent implements OnChanges, OnInit {
  @Input() user: MinUser | null = null;
  @Input() history = false;
  currentUser: User | null = null;
  pageSize = 3;
  pageNumber = 0;
  trainingListLength = 0;
  trainingList: TrainingRegistrationMax[] = [];

  constructor(private _user: UserService) {}

  ngOnInit(): void {
    this.initUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['user']) {
      this.user = changes['user'].currentValue;
      this.initTrainingList();
    }
  }

  async initUser() {
    this.currentUser = this._user.getUserInfo();
  }

  async initTrainingList() {
    if(this.user) {
      const res = await this._user.getTrainingHistory(this.user.id, this.history)
      if (typeof res === 'string') {
        console.log(res);
      } else {
        this.trainingList = res;
      }
    }
  }
  onPaginatorChange(e: PageEvent) {
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    //this.refreshList();
  }
}
