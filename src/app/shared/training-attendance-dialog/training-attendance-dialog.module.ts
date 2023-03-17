import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreModule } from '@core/core.module';
import { TrainingAttendanceDialogComponent } from './training-attendance-dialog.component';



@NgModule({
  declarations: [TrainingAttendanceDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    CoreModule
  ]
})
export class TrainingAttendanceDialogModule { }
