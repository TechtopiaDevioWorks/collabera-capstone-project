import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MinTraining, Training, TrainingRegistrationMax } from '@core/interfaces/training';
import { FeedbackService } from '@core/services/feedback.service';
import { TrainingService } from '@core/services/training.service';
import { TrainingRegistrationDeleteDialogComponent } from '@pages/training-info/features/training-registration-delete-dialog/training-registration-delete-dialog.component';
import { FeedbackDialogComponent } from '@shared/feedback-dialog/feedback-dialog.component';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { TrainingAddAttendanceDialogComponent } from '../training-add-attendance-dialog/training-add-attendance-dialog.component';
import { TrainingApplyDialogComponent } from '../training-apply-dialog/training-apply-dialog.component';
import { TrainingDeleteDialogComponent } from '../training-delete-dialog/training-delete-dialog.component';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.scss']
})
export class TrainingCardComponent implements OnInit{
  @Input() training: Training | MinTraining | null = null;
  @Input() userRoleId: number|null = null;
  @Input() userTrainingRegistrationList: TrainingRegistrationMax[] = [];
  imgUrl = 'https://bulma.io/images/placeholders/1280x960.png';
  expired = false;
  userTrainingRegistration: TrainingRegistrationMax | null | undefined = null;
  currentDate = moment();
  constructor(private dialog: MatDialog, private _feedback: FeedbackService, private _toast: ToastrService, private _training: TrainingService) {

  }
  ngOnInit(): void {
    this.checkExpired()
    this.userTrainingRegistration = this.userTrainingRegistrationList.find(e => e.training.id === this.training?.id);
  }

  checkExpired() {
    const currentMoment = moment.utc().add(-15, 'd')
    if(this.training?.endDate.isBefore(currentMoment)) {
      this.expired = true;
    }
  }

  onDeleteClick() {
    this.dialog.open(TrainingDeleteDialogComponent, {
      data: {
        training: this.training
      }
    })
  }

  onApplyClick() {
    this.dialog.open(TrainingApplyDialogComponent, {
      data: {
        training: this.training
      }
    })
  }

  async onDeleteRegistration() {
    const res = await firstValueFrom(
      this.dialog.open(TrainingRegistrationDeleteDialogComponent, {
        data: {
          trainingRegistration: this.userTrainingRegistration,
        },
      })
        .afterClosed()
    );
    if (res===true) {
      this.userTrainingRegistration = null;
    }
  }

  async onGiveFeedback() {
    if(!this.training) return;
    const resFeedback = await firstValueFrom(
      this.dialog
        .open(FeedbackDialogComponent, {
          data: {
            title: 'Feedback',
            subtitle: 'Give feedback to this training',
            editable: true,
          },
        })
        .afterClosed()
    );
    if (resFeedback === false) {
      return;
    }
    const res = await this._feedback.create(
      1,
      resFeedback,
      this.training.id,
      null,
    );
    if (typeof res === 'string') {
      this._toast.warning(`Error! ${res}`);
      return false;
    }
    this._toast.success(`Feedback submitted!`);
    return true
  }

  async onAddAttendance() {
    if(!this.training) return false;
    const res = await firstValueFrom(
      this.dialog.open(TrainingAddAttendanceDialogComponent, {
      })
        .afterClosed()
    );
    if (res!==false) {
      if(res.start && res.end) {
        const startTime = res.start.split(':');
        const endTime = res.end.split(':');
        const resStartDate = moment().set('h', startTime[0]).set('minute', startTime[1]).utc(true)
        const resEndDate = moment().set('h', endTime[0]).set('minute', endTime[1]).utc(true)
        const resAtt = await this._training.addAttendance(
          this.training.id,
          resStartDate.toISOString(),
          resEndDate.toISOString()
        );
        if (typeof resAtt === 'string') {
          this._toast.warning(`Error! ${resAtt}`);
          return false;
        }
        this._toast.success(`Attendance submitted!`);
        return true
      }
    }
    return false
  }

  async onViewReason() {
    if (!this.userTrainingRegistration) return;
    const res = await this._feedback.getFeedbackList(
      4,
      null,
      null,
      null,
      this.userTrainingRegistration.id
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

}
