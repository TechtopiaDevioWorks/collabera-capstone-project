import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TrainingAttendance } from '@core/interfaces/training';
import { TrainingService } from '@core/services/training.service';

@Component({
  selector: 'app-training-attendance-dialog',
  templateUrl: './training-attendance-dialog.component.html',
  styleUrls: ['./training-attendance-dialog.component.scss'],
})
export class TrainingAttendanceDialogComponent implements OnInit {
  subtitle = '';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      training_id: number | null;
      user_id: number | null;
    },
    private _training: TrainingService
  ) {}
  attendanceList: TrainingAttendance[] = [];
  ngOnInit(): void {
    this.initAttendanceList();
  }

  async initAttendanceList(){
    const attendanceList = await this._training.getAttendances(this.data.user_id, this.data.training_id);
    if (typeof attendanceList === 'string') {
      console.error(attendanceList);
    } else {
      this.attendanceList = attendanceList;
    }
    console.log(this.attendanceList)
  }
}
