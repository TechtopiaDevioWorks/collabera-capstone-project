import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingRegistrationMax } from '@core/interfaces/training';
import { User } from '@core/interfaces/user';
import { FeedbackService } from '@core/services/feedback.service';
import { TrainingService } from '@core/services/training.service';
import { FeedbackDialogComponent } from '@shared/feedback-dialog/feedback-dialog.component';
import { TrainingAttendanceDialogComponent } from '@shared/training-attendance-dialog/training-attendance-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-training-history-card',
  templateUrl: './training-history-card.component.html',
  styleUrls: ['./training-history-card.component.scss']
})
export class TrainingHistoryCardComponent {
  @Input() training: TrainingRegistrationMax | null = null;
  @Input() currentUser: User|null = null;
  requestLoading = false;
  requestError = '';
  constructor(
    public dialog: MatDialog,
    private _training: TrainingService,
    private _feedback: FeedbackService,
    private _toast: ToastrService
  ) {}


  async onViewFeedback() {
    if (!this.training) return;
    const res = await this._feedback.getFeedbackList(
      4,
      null,
      null,
      null,
      this.training.id
    );
    if (typeof res === 'string') {
      this._toast.warning(`Error! ${res}`);
      return;
    } else {
      let message = '';
      if(res.length === 0) {
        this._toast.warning(`No feedback available!`);
      return;
      }
      for(const feedback of res) {
        message+=`From ${feedback.fromUser.firstname} ${feedback.fromUser.lastname} (${feedback.fromUser.username}): ${feedback.message} \n`
      }
      this.dialog.open(FeedbackDialogComponent, {
        data: {
          title: 'Registration feedback',
          subtitle: null,
          editable: false,
          message: message,
        },
      });
    }
  }

  async onViewAttendances() {
    if (!this.training) return;
      this.dialog.open(TrainingAttendanceDialogComponent, {
        data: {
          training_id: this.training.training.id,
          user_id: this.training.user.id
        },
      });
    }
}
