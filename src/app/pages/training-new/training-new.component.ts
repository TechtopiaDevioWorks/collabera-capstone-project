import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NewTraining, Training } from '@core/interfaces/training';
import { User } from '@core/interfaces/user';
import { TrainingService } from '@core/services/training.service';
import { UserService } from '@core/services/user.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training-new',
  templateUrl: './training-new.component.html',
  styleUrls: ['./training-new.component.scss'],
})
export class TrainingNewComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
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
  minDate = moment();
  requestError = '';
  requestLoading = false;

  constructor(
    private _router: Router,
    private _user: UserService,
    private _training: TrainingService
  ) {}
  ngOnInit(): void {

  }

  async initUser() {
    this.currentUser = this._user.getUserInfo();
  }

  async initTraining() {
   
  }

  async onSubmit() {
    if (this.requestLoading) {
      return;
    }
    if (this.trainingForm.valid) {
      this.requestLoading = true;
      this.requestError = '';
      const trainingFormData = {
        title: this.trainingForm.get('title')?.value,
        description: this.trainingForm.get('description')?.value,
        minHours: this.trainingForm.get('minHours')?.value,
        start: this.trainingForm.get('dateRange')?.get('startDate')?.value,
        end: this.trainingForm.get('dateRange')?.get('endDate')?.value,
      };
      if (
        trainingFormData.title &&
        trainingFormData.description &&
        trainingFormData.minHours &&
        trainingFormData.start &&
        trainingFormData.end
      ) {
        const newTraining: NewTraining = {
          name: trainingFormData.title,
          description: trainingFormData.description,
          start: trainingFormData.start.utc(true).startOf('d').toISOString(),
          end: trainingFormData.end.utc(true).startOf('d').toISOString(),
          min_hours: trainingFormData.minHours,
        }
        const trainingStatus = await this._training.create(newTraining);
        if (trainingStatus === true) {
          this._router.navigate(['/trainings'], {
            queryParams: { createSuccess: true },
          });
        } else {
          this.requestError = `Creation Failed! ${trainingStatus}`;
        }
      }
    }
    this.requestLoading = false;
  }


  ngOnDestroy(): void {
   
  }
}
