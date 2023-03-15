import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

import { TrainingListRoutingModule } from './training-list-routing.module';
import { TrainingListComponent } from './training-list.component';
import { TrainingListFilterComponent } from './features/training-list-filter/training-list-filter.component';
import { TrainingCardComponent } from './features/training-card/training-card.component';
import { CoreModule } from '@core/core.module';
import { TrainingDeleteDialogComponent } from './features/training-delete-dialog/training-delete-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    TrainingListComponent,
    TrainingListFilterComponent,
    TrainingCardComponent,
    TrainingDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    TrainingListRoutingModule,
    MatPaginatorModule,
    CoreModule,
    MatDialogModule
  ],
  providers: [MatDialog],
})
export class TrainingListModule {}
