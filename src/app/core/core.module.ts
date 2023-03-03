import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentPipe } from './pipes/moment.pipe';
@NgModule({
  declarations: [
    MomentPipe
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule, MatDatepickerModule],
  exports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule, MatDatepickerModule, MomentPipe],
  providers: [],
})
export class CoreModule {}
