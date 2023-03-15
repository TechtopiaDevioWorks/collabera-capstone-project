import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingInfoRoutingModule } from './training-info-routing.module';
import { TrainingInfoComponent } from './training-info.component';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    TrainingInfoComponent
  ],
  imports: [
    CommonModule,
    TrainingInfoRoutingModule,
    CoreModule
  ]
})
export class TrainingInfoModule { }
