import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Training } from '@core/interfaces/training';
import { User } from '@core/interfaces/user';
import { TrainingService } from '@core/services/training.service';
import { UserService } from '@core/services/user.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training-info',
  templateUrl: './training-info.component.html',
  styleUrls: ['./training-info.component.scss']
})
export class TrainingInfoComponent implements OnInit, OnDestroy{
  routeParamSubscription: Subscription | null = null;
  queryParamSubscription: Subscription | null = null;
  currentUser: User | null = null;
  trainigId: number | null = null;
  training: Training | null = null;
  editMode: boolean = false;
  createMode: boolean = false;
  trainingForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
    ]),
    dateRange: new FormGroup({
      startDate: new FormControl<moment.Moment | null>(null, [Validators.required]),
		  endDate: new FormControl<moment.Moment | null>(null, [Validators.required]),
    }),
    minHours: new FormControl<number|null>(null, [Validators.required]),
  });
  fieldInEdit: string | null = null;
  fieldLoading: string | null = null;
  requestError = '';

  constructor(private _route: ActivatedRoute, private _user: UserService, private _training: TrainingService) {}
  ngOnInit(): void {
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
    this.queryParamSubscription = this._route.queryParamMap.subscribe((params: ParamMap) => {
      const editMode = params.get('edit');
      if(editMode && editMode.toUpperCase() === 'TRUE') {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
      const createMode = params.get('new');
      if(createMode && createMode.toUpperCase() === 'NEW') {
        this.createMode = true;
      } else {
        this.createMode = false;
      }
    })
  }

  async initUser() {
   this.currentUser = this._user.getUserInfo();
  }

  async initTraining() {
    if(this.trainigId) {
      const training = await this._training.getTrainingById(this.trainigId);
      if (typeof training === 'string') {
        console.error(training);
      } else {
        this.training = training;
      }
    }
  }

  go2EditField(fieldName: string) {
    const field = this.trainingForm.get(fieldName);
    if (!field) {
      this.fieldInEdit = null;
      return;
    }
    this.fieldInEdit = fieldName;
    field.enable();
  }

  cancelEditField() {
    this.fieldInEdit = null;
    this.fieldLoading = null;
    //this.initForm();
  }
  async saveEditField(fieldName: string) {
    this.requestError = '';
    const field = this.trainingForm.get(fieldName);
    if (!field || !this.trainigId) {
      this.cancelEditField();
      return;
    }
    this.fieldLoading = fieldName;
    const res = await this._user.updateUserField(this.trainigId, fieldName, field.value);
    if(typeof res === 'string') {
      this.requestError = res;
    } else {
      await this.initUser();
    }
    this.fieldLoading = null;
    this.cancelEditField();
  }


  ngOnDestroy(): void {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
      this.routeParamSubscription = null;
    }
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
      this.queryParamSubscription = null;
    }
  }
}
