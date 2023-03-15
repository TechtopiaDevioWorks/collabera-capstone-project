import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastTrainingListComponent } from './past-training-list.component';
import { CoreModule } from '@core/core.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TrainingHistoryCardComponent } from './training-history-card/training-history-card.component';



@NgModule({
  declarations: [
    PastTrainingListComponent,
    TrainingHistoryCardComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    CoreModule
  ],
  exports: [PastTrainingListComponent]
})
export class PastTrainingListModule { }
