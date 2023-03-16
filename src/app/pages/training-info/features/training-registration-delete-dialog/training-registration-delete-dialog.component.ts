import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainingRegistrationMax } from '@core/interfaces/training';
import { TrainingService } from '@core/services/training.service';

@Component({
  selector: 'app-training-registration-delete-dialog',
  templateUrl: './training-registration-delete-dialog.component.html',
  styleUrls: ['./training-registration-delete-dialog.component.scss']
})
export class TrainingRegistrationDeleteDialogComponent  {

  constructor(
    private dialogRef: MatDialogRef<TrainingRegistrationDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { trainingRegistration: TrainingRegistrationMax | null },
    private _trainingService: TrainingService
  ) {}
  requestLoading = false;
  requestError = '';

  async onConfirmClick() {
    if (this.requestLoading) {
      return;
    }
    this.requestLoading = true;
    this.requestError = '';

    if (this.data.trainingRegistration) {
      const deleteStatus = await this._trainingService.deleteRegistration(this.data.trainingRegistration.id);
      if (deleteStatus === true) {
        this.dialogRef.close(true);
      } else {
        this.requestError = `Delete Failed! ${deleteStatus}`;
      }
    }
    this.requestLoading = false;
  }
}
