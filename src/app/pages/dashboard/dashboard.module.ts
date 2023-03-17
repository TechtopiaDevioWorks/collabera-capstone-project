import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TrainingListModule } from '@pages/training-list/training-list.module';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TrainingListModule,
    MatPaginatorModule
  ]
})
export class DashboardModule {
}
