import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingNewComponent } from './training-new.component';

const routes: Routes = [
  {path: '', component: TrainingNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingNewRoutingModule { }
