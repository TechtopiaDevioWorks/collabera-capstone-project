import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackDialogComponent } from './feedback-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    FeedbackDialogComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatDialogModule,
  ],
})
export class FeedbackDialogModule { }
