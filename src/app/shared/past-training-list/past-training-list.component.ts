import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from '@core/interfaces/user';

@Component({
  selector: 'app-past-training-list',
  templateUrl: './past-training-list.component.html',
  styleUrls: ['./past-training-list.component.scss'],
})
export class PastTrainingListComponent implements OnChanges {
  @Input() user: User | null = null;
  pageSize = 3;
  pageNumber = 0;
  trainingListLength = 0;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  onPaginatorChange(e: PageEvent) {
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    //this.refreshList();
  }
}
