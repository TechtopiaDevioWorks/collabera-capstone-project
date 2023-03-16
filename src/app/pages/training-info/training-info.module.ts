import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingInfoRoutingModule } from './training-info-routing.module';
import { TrainingInfoComponent } from './training-info.component';
import { CoreModule } from '@core/core.module';
import { TrainingAppliantCardComponent } from './features/training-appliant-card/training-appliant-card.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TrainingRegistrationDeleteDialogComponent } from './features/training-registration-delete-dialog/training-registration-delete-dialog.component';
import { FeedbackDialogModule } from '@shared/feedback-dialog/feedback-dialog.module';


@NgModule({
  declarations: [
    TrainingInfoComponent,
    TrainingAppliantCardComponent,
    TrainingRegistrationDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    TrainingInfoRoutingModule,
    CoreModule,
    MatDialogModule,
    FeedbackDialogModule
  ],
  providers: [MatDialog]
})
export class TrainingInfoModule { }
