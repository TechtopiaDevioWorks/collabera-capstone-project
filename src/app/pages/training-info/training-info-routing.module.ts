import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingInfoComponent } from './training-info.component';

const routes: Routes = [
  {path: '', component: TrainingInfoComponent},
  {path: ':id', component: TrainingInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingInfoRoutingModule { }
