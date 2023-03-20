import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Training } from '@core/interfaces/training';
import { TrainingService } from '@core/services/training.service';

@Component({
  selector: 'app-training-apply-dialog',
  templateUrl: './training-apply-dialog.component.html',
  styleUrls: ['./training-apply-dialog.component.scss']
})
export class TrainingApplyDialogComponent {
  constructor(
    private _router: Router,
    private dialogRef: MatDialogRef<TrainingApplyDialogComponent>,
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
      const applyStatus = await this._training.apply(this.data.training.id);
      if (applyStatus === true) {
        this.dialogRef.close(true);
        this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this._router.navigate(['/trainings']);
      });
      } else {
        this.requestError = `Application Failed! ${applyStatus}`;
      }
    }
    this.requestLoading = false;
  }
}
