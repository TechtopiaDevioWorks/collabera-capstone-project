import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingInfoRoutingModule } from './training-info-routing.module';
import { TrainingInfoComponent } from './training-info.component';


@NgModule({
  declarations: [
    TrainingInfoComponent
  ],
  imports: [
    CommonModule,
    TrainingInfoRoutingModule
  ]
})
export class TrainingInfoModule { }
