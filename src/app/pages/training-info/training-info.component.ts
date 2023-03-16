import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Status, Training, TrainingRegistrationMax } from '@core/interfaces/training';
import { User } from '@core/interfaces/user';
import { TrainingService } from '@core/services/training.service';
import { UserService } from '@core/services/user.service';
import * as moment from 'moment';
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
    private _training: TrainingService
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
 
  

  ngOnDestroy(): void {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
      this.routeParamSubscription = null;
    }
  }
}
