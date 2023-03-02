import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingListRoutingModule } from './training-list-routing.module';
import { TrainingListComponent } from './training-list.component';


@NgModule({
  declarations: [
    TrainingListComponent
  ],
  imports: [
    CommonModule,
    TrainingListRoutingModule
  ]
})
export class TrainingListModule { }
