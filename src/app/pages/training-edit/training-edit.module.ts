import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingEditRoutingModule } from './training-edit-routing.module';
import { TrainingEditComponent } from './training-edit.component';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [TrainingEditComponent],
  imports: [
    CommonModule,
    TrainingEditRoutingModule,
    CoreModule
  ]
})
export class TrainingEditModule { }
