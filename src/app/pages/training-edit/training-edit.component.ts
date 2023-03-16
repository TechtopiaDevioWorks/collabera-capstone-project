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
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.scss']
})
export class TrainingEditComponent  implements OnInit, OnDestroy {
  routeParamSubscription: Subscription | null = null;
  currentUser: User | null = null;
  trainigId: number | null = null;
  training: Training | null = null;
  trainingForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255),
    ]),
    dateRange: new FormGroup({
      startDate: new FormControl<moment.Moment | null>(null, [
        Validators.required,
      ]),
      endDate: new FormControl<moment.Moment | null>(null, [
        Validators.required,
      ]),
    }),
    minHours: new FormControl<number | null>(null, [Validators.required]),
  });
  fieldInEdit: string | null = null;
  fieldLoading: string | null = null;
  minDate = moment();
  requestError = '';

  constructor(
    private _route: ActivatedRoute,
    private _user: UserService,
    private _training: TrainingService
  ) {}
  ngOnInit(): void {
    this.routeParamSubscription = this._route.paramMap.subscribe(
      (params: ParamMap) => {
        const trainingId = params.get('id');
        if (trainingId) {
          this.trainigId = parseInt(trainingId);
        } else {
          this.trainigId = null;
        }
        this.initForm();
      }
    );
  }

  async initUser() {
    this.currentUser = this._user.getUserInfo();
  }

  async initTraining() {
    if (this.trainigId) {
      const training = await this._training.getTrainingById(this.trainigId);
      if (typeof training === 'string') {
        console.error(training);
      } else {
        this.training = training;
      }
    }
  }

  async initForm() {
    await this.initTraining();
    this.trainingForm.reset();
    this.trainingForm.get('title')?.disable();
    this.trainingForm.get('description')?.disable();
    this.trainingForm.get('dateRange')?.disable();
    this.trainingForm.get('minHours')?.disable();
    this.trainingForm.get('dateRange')?.get('startDate')?.disable();
    this.trainingForm.get('dateRange')?.get('endDate')?.disable();

    if (this.training) {
      this.trainingForm.get('title')?.setValue(this.training.title);
      this.trainingForm.get('description')?.setValue(this.training.description);
      this.trainingForm.get('minHours')?.setValue(this.training.duration);
      this.trainingForm
        .get('dateRange')
        ?.get('startDate')
        ?.setValue(this.training.startDate);
      this.trainingForm
        .get('dateRange')
        ?.get('endDate')
        ?.setValue(this.training.endDate);
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
    this.initForm();
  }
  async saveEditField(fieldName: string) {
    this.requestError = '';
    const field = this.trainingForm.get(fieldName);
    if (!field || !this.trainigId) {
      this.cancelEditField();
      return;
    }
    this.fieldLoading = fieldName;
    if (fieldName === 'dateRange') {
      const fieldStart = this.trainingForm
        .get('dateRange')
        ?.get('startDate')?.value;
      const fieldEnd = this.trainingForm
        .get('dateRange')
        ?.get('endDate')?.value;
      if (!fieldStart || !fieldEnd) {
        this.cancelEditField();
        return;
      }
      const res = await this._training.updateTrainingDate(
        this.trainigId,
        fieldStart,
        fieldEnd
      );
      if (typeof res === 'string') {
        this.requestError = res;
      }
    } else {
      const res = await this._training.updateTrainingField(
        this.trainigId,
        fieldName,
        field.value
      );
      if (typeof res === 'string') {
        this.requestError = res;
      }
    }
    this.fieldLoading = null;
    this.cancelEditField();
  }

  ngOnDestroy(): void {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
      this.routeParamSubscription = null;
    }
  }
}
