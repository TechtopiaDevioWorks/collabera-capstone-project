import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingListComponent } from './training-list.component';

const routes: Routes = [
  {path: '', component: TrainingListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingListRoutingModule { }
