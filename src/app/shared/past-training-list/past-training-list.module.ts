import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastTrainingListComponent } from './past-training-list.component';
import { CoreModule } from '@core/core.module';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    PastTrainingListComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    CoreModule
  ],
  exports: [PastTrainingListComponent]
})
export class PastTrainingListModule { }
