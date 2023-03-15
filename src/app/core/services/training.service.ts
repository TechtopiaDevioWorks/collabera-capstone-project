import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MinTraining,
  Training,
  TrainingFilter,
} from '@core/interfaces/training';
import { User } from '@core/interfaces/user';
import * as moment from 'moment';
import { Moment } from 'moment';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {

  dummyTrainingList: Training[] =[];

  private latestTrainingFilteredList: Training[] | MinTraining[] = [];
  private latestTrainingFilter: string | null = null;

  constructor(private _user: UserService, private _http: HttpClient) {
    const currentMoment = moment.utc();
    this.dummyTrainingList.sort((a, b) => {
      if (
        a.endDate.isAfter(currentMoment) &&
        b.endDate.isAfter(currentMoment)
      ) {
        if (a.startDate.isAfter(b.startDate)) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.endDate.isAfter(currentMoment)) {
        return -1;
      } else if (b.endDate.isAfter(currentMoment)) {
        return 1;
      } else {
        if (a.startDate.isAfter(b.startDate)) {
          return 1;
        } else {
          return -1;
        }
      }
    });
  }

  async getTrainingList(
    minDate: Moment | null = null,
    maxDate: Moment | null = null,
    applicants: true | null = null,
    results: number = 10,
    page: number = 0
  ): Promise<MinTraining[] | Training[]> {
    const filter: TrainingFilter = {};
    const userRole = await this._user.getUserRole();
    const userRoleId = userRole ? userRole.id : null;
    if (minDate) filter.minDate = minDate;
    if (maxDate) filter.maxDate = maxDate;
    if (applicants) filter.applicants = applicants;
    if (
      this.latestTrainingFilter === JSON.stringify(filter) &&
      this.latestTrainingFilteredList &&
      this.latestTrainingFilteredList.length > 0
    ) {
    } else {
      await this.refreshTrainingList();
      const filteredList = this.dummyTrainingList.filter((training) => {
        return Object.keys(filter).every((key) => {
          if (filter[key] === null) return true;
          if (key === 'minDate') {
            return training.startDate.isAfter(filter.minDate);
          } else if (key === 'maxDate') {
            return training.endDate.isBefore(filter.maxDate);
          } else if (key === 'applicants') {
            return training?.applicants?.length > 0;
          } else return true;
        });
      });
      if (userRoleId === 1) {
        this.latestTrainingFilteredList = filteredList.map((e) => {
          const eNew: MinTraining = e;
          return eNew;
        });
      } else {
        this.latestTrainingFilteredList = filteredList;
      }
      this.latestTrainingFilter = JSON.stringify(filter);
    }
    const start = page * results;
    const end = start + results;
    return this.latestTrainingFilteredList.slice(start, end);
  }

  async getTrainingListLength(
    minDate: Moment | null = null,
    maxDate: Moment | null = null,
    applicants: true | null = null
  ): Promise<number> {
    const filter: TrainingFilter = {};
    const userRole = await this._user.getUserRole();
    const userRoleId = userRole ? userRole.id : null;
    if (minDate) filter.minDate = minDate;
    if (maxDate) filter.maxDate = maxDate;
    if (applicants) filter.applicants = applicants;
    if (
      this.latestTrainingFilter === JSON.stringify(filter) &&
      this.latestTrainingFilteredList &&
      this.latestTrainingFilteredList.length > 0
    ) {
    } else {
      await this.refreshTrainingList();
      const filteredList = this.dummyTrainingList.filter((training) => {
        return Object.keys(filter).every((key) => {
          if (filter[key] === null) return true;
          if (key === 'minDate') {
            return training.startDate.isAfter(filter.minDate);
          } else if (key === 'maxDate') {
            return training.endDate.isBefore(filter.maxDate);
          } else if (key === 'applicants') {
            return training?.applicants?.length > 0;
          } else return true;
        });
      });
      if (userRoleId === 1) {
        this.latestTrainingFilteredList = filteredList.map((e) => {
          const eNew: MinTraining = e;
          return eNew;
        });
      } else {
        this.latestTrainingFilteredList = filteredList;
      }
      this.latestTrainingFilter = JSON.stringify(filter);
    }
    return this.latestTrainingFilteredList.length;
  }

  private async refreshTrainingList(): Promise<true | string> {
    try {
      const res = await firstValueFrom(
				this._http.get<any[]>(environment.apiUrl + `/training`)
			);
      if (res) {
        this.dummyTrainingList = res.map(apiElm => {
          const elm: Training = {
            id: apiElm.id,
            title: apiElm.name,
            description: apiElm.description,
            duration: apiElm.min_hours,
            status: apiElm.status,
            startDate: moment(apiElm.start),
            endDate: moment(apiElm.end),
            applicants: []
          }
          return elm;
        })
        return true;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      return this.handleError(e);
    }
  }

  async delete(trainingId: number): Promise<boolean | string> {
    try {
      const res = await firstValueFrom(
        this._http.delete<any>(environment.apiUrl + `/training/${trainingId}`)
      );
      if (res) {
        console.log(res);
        return true;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      return this.handleError(e);
    }
  }

  async getTrainingById(trainingId: number): Promise<Training | string> {
    try {
      const res = await firstValueFrom(
        this._http.get<any>(
          environment.apiUrl + `/training/${trainingId}?expand=true`
        )
      );
      if (res) {
        return {
          id: res.id,
          title: res.name,
          description: res.description,
          duration: res.min_hours,
          status: res.status,
          startDate: moment(res.start),
          endDate: moment(res.end),
          applicants: []
        };
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      console.log(e);
      return this.handleError(e);
    }
  }


  private handleError(error: HttpErrorResponse | unknown): string {
    let errorMessage = 'Unexpected error occured. Try again!';
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        errorMessage = `An error occurred: ${error.error}`;
      } else {
        if (error.error?.message) return error.error.message;
        errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
      }
    }
    console.error(errorMessage);
    return errorMessage;
  }
}
