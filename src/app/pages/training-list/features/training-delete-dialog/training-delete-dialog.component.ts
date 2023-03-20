import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Training } from '@core/interfaces/training';
import { TrainingService } from '@core/services/training.service';

@Component({
  selector: 'app-training-delete-dialog',
  templateUrl: './training-delete-dialog.component.html',
  styleUrls: ['./training-delete-dialog.component.scss']
})
export class TrainingDeleteDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<TrainingDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { training: Training | null },
    private _training: TrainingService
  ) {}
  requestLoading = false;
  requestError = '';

  async onConfirmClick() {
    if (this.requestLoading) {
      return;
    }
    this.requestLoading = true;
    this.requestError = '';

    if (this.data.training) {
      const deleteStatus = await this._training.delete(this.data.training.id);
      if (deleteStatus === true) {
        this.dialogRef.close(true);
      } else {
        this.requestError = `Delete Failed! ${deleteStatus}`;
      }
    }
    this.requestLoading = false;
  }
}
