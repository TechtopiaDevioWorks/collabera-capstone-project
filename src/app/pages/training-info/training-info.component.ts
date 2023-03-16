import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Feedback } from '@core/interfaces/feedback';
import { Status, Training, TrainingRegistrationMax } from '@core/interfaces/training';
import { User } from '@core/interfaces/user';
import { FeedbackService } from '@core/services/feedback.service';
import { TrainingService } from '@core/services/training.service';
import { UserService } from '@core/services/user.service';
import { FeedbackDialogComponent } from '@shared/feedback-dialog/feedback-dialog.component';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training-info',
  templateUrl: './training-info.component.html',
  styleUrls: ['./training-info.component.scss'],
})
export class TrainingInfoComponent implements OnInit, OnDestroy {
  routeParamSubscription: Subscription | null = null;
  currentUser: User | null = null;
  trainigId: number | null = null;
  training: Training | null = null;
  trainingRegistrationList: TrainingRegistrationMax[] = [];
  requestError = '';
  trainingRegistrationStatusList: Status[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _user: UserService,
    private _training: TrainingService,
    private _feedback: FeedbackService,
    private _toast: ToastrService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.initUser();
    this.initTRegStatusList();
    this.routeParamSubscription = this._route.paramMap.subscribe(
      (params: ParamMap) => {
        const trainingId = params.get('id');
        if (trainingId) {
          this.trainigId = parseInt(trainingId);
        } else {
          this.trainigId = null;
        }
        this.initTraining();
      }
    );
  }

  async initUser() {
    this.currentUser = this._user.getUserInfo();
  }

  async initTRegStatusList() {
    const tregStatusList = await this._training.getTrainingRegistrationStatusList();
    if (typeof tregStatusList === 'string') {
      console.error(tregStatusList);
    } else {
      this.trainingRegistrationStatusList = tregStatusList;
    }
  }

  async initTraining() {
    if (this.trainigId) {
      const training = await this._training.getTrainingById(this.trainigId);
      if (typeof training === 'string') {
        console.error(training);
      } else {
        this.training = training;
        await this.initTrainingRegistrationList();
      }
    }
  }

  async initTrainingRegistrationList() {
    if (this.trainigId) {
      const trainingRegistration = await this._training.getTrainingRegistrationList(this.trainigId);
      if (typeof trainingRegistration === 'string') {
        console.error(trainingRegistration);
      } else {
        this.trainingRegistrationList = trainingRegistration;
      }
    }
  }
 
  async onViewFeedback() {
    if (!this.training) return;
    const res = await this._feedback.getFeedbackList(
      1,
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
          title: 'Training feedback',
          subtitle: null,
          editable: false,
          message: message,
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
      this.routeParamSubscription = null;
    }
  }
}
