import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training-add-attendance-dialog',
  templateUrl: './training-add-attendance-dialog.component.html',
  styleUrls: ['./training-add-attendance-dialog.component.scss']
})
export class TrainingAddAttendanceDialogComponent implements OnInit, OnDestroy {
  attendanceForm = new FormGroup({
      start: new FormControl<string>('00:00', [
        Validators.required,
      ]),
      end: new FormControl<string>('00:00', [
        Validators.required])
  });
  formSubscription: Subscription | null = null;
  minTime = '';
  constructor(
    private dialogRef: MatDialogRef<TrainingAddAttendanceDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.attendanceForm.get('end')?.addValidators(this.endAfterStart);
    this.attendanceForm.get('start')?.valueChanges.subscribe(value => {
      if (value)
      this.minTime = value;
    })
  }
  ngOnDestroy(): void {
    if(this.formSubscription) {
      this.formSubscription.unsubscribe();
      this.formSubscription = null;
    }
  }

  async onConfirmClick() {
    this.dialogRef.close({
      start: this.attendanceForm.get('start')?.value,
      end: this.attendanceForm.get('end')?.value,
    })
  }

  private endAfterStart: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let start = this.attendanceForm.get('start')?.value;
    let end = this.attendanceForm.get('end')?.value;
    if(!start || !end) return {endAfterStart: true}
    else if(parseInt(start.replaceAll(':','')) >= parseInt(end.replaceAll(':',''))) return {endAfterStart: true}
    else return null;
  };
}
