import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { CoreModule } from '@core/core.module';
import { PastTrainingListModule } from '@shared/past-training-list/past-training-list.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    CoreModule,
    PastTrainingListModule
  ]
})
export class ProfileModule { }
