import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingNewRoutingModule } from './training-new-routing.module';
import { TrainingNewComponent } from './training-new.component';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    TrainingNewComponent
  ],
  imports: [
    CommonModule,
    TrainingNewRoutingModule,
    CoreModule
  ]
})
export class TrainingNewModule { }
