import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingEditComponent } from './training-edit.component';

const routes: Routes = [
  {path: ':id', component: TrainingEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingEditRoutingModule { }
