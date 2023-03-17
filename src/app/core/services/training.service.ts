import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MinTraining,
  NewTraining,
  Status,
  Training,
  TrainingAttendance,
  TrainingFilter,
  TrainingRegistrationMax,
  TrainingRegistrationMin,
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
  constructor(private _user: UserService, private _http: HttpClient) {
    const currentMoment = moment.utc();
  }

  async getTrainingList(
    minDate: Moment | null = null,
    maxDate: Moment | null = null,
    applicants: true | null = null,
    results: number = 10,
    page: number = 0
  ): Promise<MinTraining[] | string> {
    const filter: TrainingFilter = {};
    if (minDate) filter.minDate = minDate;
    if (maxDate) filter.maxDate = maxDate;
    if (applicants) filter.applicants = applicants;
    const start = page * results;
    try {
      const res = await firstValueFrom(
        this._http.get<any[]>(
          environment.apiUrl +
            `/training?$top=${results}&$skip=${start}&$orderby=expired,start`
        )
      );
      if (res) {
        const trainingList = res.map((apiElm) => {
          const elm: MinTraining = {
            id: apiElm.id,
            title: apiElm.name,
            description: apiElm.description,
            duration: apiElm.min_hours,
            status: apiElm.status,
            startDate: moment(apiElm.start),
            endDate: moment(apiElm.end),
            noapplicants: apiElm.noTrainingRegistrations,
          };
          return elm;
        });
        return trainingList;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      console.log(e);
      return this.handleError(e);
    }
  }

  async getTrainingListFiltered(
    minStartDate: Moment | null = null,
    maxStartDate: Moment | null = null,
    minEndDate: Moment | null = null,
    maxEndDate: Moment | null = null,
    results: number = 10,
    page: number = 0
  ): Promise<MinTraining[] | string> {
    const start = page * results;
    let filter = '';
    const params:any  = {
      "$top": results,
      "$skip": start,
      "$orderBy": 'expired, start'
    }
    if(minStartDate) filter+=`start ge ${minStartDate.format("YYYY-MM-DD")} and `
    if(maxStartDate) filter+=`start le ${maxStartDate.format("YYYY-MM-DD")} and `
    if(minEndDate) filter+=`end ge ${minEndDate.format("YYYY-MM-DD")} and `
    if(maxEndDate) filter+=`end le ${maxEndDate.format("YYYY-MM-DD")} and `
    let index = filter.lastIndexOf(" and ");

    if (index !== -1) {
      filter = filter.slice(0, index) + filter.slice(index).replace(" and ", "");
    }

    if (filter && filter.length > 0) params["$filter"] = filter;
    try {
      const res = await firstValueFrom(
        this._http.get<any[]>(
          environment.apiUrl +
            `/training`
        , {
          params: params
        })
      );
      if (res) {
        const trainingList = res.map((apiElm) => {
          const elm: MinTraining = {
            id: apiElm.id,
            title: apiElm.name,
            description: apiElm.description,
            duration: apiElm.min_hours,
            status: apiElm.status,
            startDate: moment(apiElm.start),
            endDate: moment(apiElm.end),
            noapplicants: apiElm.noTrainingRegistrations,
          };
          return elm;
        });
        return trainingList;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      console.log(e);
      return this.handleError(e);
    }
  }

  async getTrainingListFilteredLength(
    minStartDate: Moment | null = null,
    maxStartDate: Moment | null = null,
    minEndDate: Moment | null = null,
    maxEndDate: Moment | null = null,
  ): Promise<number | string> {
    let filter = '';
    const params:any  = {
    }
    if(minStartDate) filter+=`start ge ${minStartDate.format("YYYY-MM-DD")} and `
    if(maxStartDate) filter+=`start le ${maxStartDate.format("YYYY-MM-DD")} and `
    if(minEndDate) filter+=`end ge ${minEndDate.format("YYYY-MM-DD")} and `
    if(maxEndDate) filter+=`end le ${maxEndDate.format("YYYY-MM-DD")} and `
    let index = filter.lastIndexOf(" and ");

    if (index !== -1) {
      filter = filter.slice(0, index) + filter.slice(index).replace(" and ", "");
    }

    if (filter && filter.length > 0) params["$filter"] = filter;
    try {
      const res = await firstValueFrom(
        this._http.get<number>(
          environment.apiUrl +
            `/training-filtered/count`
        , {
          params: params
        })
      );
      if (res) {
        return res;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      console.log(e);
      return this.handleError(e);
    }
  }

  async getTrainingListLength(
    minDate: Moment | null = null,
    maxDate: Moment | null = null,
    applicants: true | null = null
  ): Promise<number | string> {
    const filter: TrainingFilter = {};
    if (minDate) filter.minDate = minDate;
    if (maxDate) filter.maxDate = maxDate;
    if (applicants) filter.applicants = applicants;
    try {
      const res = await firstValueFrom(
        this._http.get<number>(environment.apiUrl + `/training/count`)
      );
      if (res) {
        return res;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      console.log(e);
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

  async deleteRegistration(registrationId: number): Promise<boolean | string> {
    try {
      const res = await firstValueFrom(
        this._http.delete<any>(
          environment.apiUrl + `/training-registration/${registrationId}`
        )
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

  async apply(trainingId: number): Promise<boolean | string> {
    try {
      const user = this._user.getUserInfo();
      if (!user) return "Can't indentify user.";
      if (user.role.id !== 1) return "Your user role can't apply for training.";
      const body = {
        user_id: user.id,
        training_id: trainingId,
      };
      const res = await firstValueFrom(
        this._http.post<any>(
          environment.apiUrl + `/training-registration/`,
          body
        )
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

  async addAttendance(
    trainingId: number,
    startDateTime: string,
    endDateTime: string
  ): Promise<boolean | string> {
    try {
      const user = this._user.getUserInfo();
      if (!user) return "Can't indentify user.";
      if (user.role.id !== 1) return "Your user role can't add attendance.";
      const body = {
        user_id: user.id,
        training_id: trainingId,
        start: startDateTime,
        end: endDateTime,
      };
      const res = await firstValueFrom(
        this._http.post<any>(
          environment.apiUrl + `/attendance`,
          body
        )
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

  async getTrainingRegistrationList(
    trainingId: number
  ): Promise<TrainingRegistrationMax[] | string> {
    try {
      const res = await firstValueFrom(
        this._http.get<any[]>(
          environment.apiUrl +
            `/training-registration/training/${trainingId}?expand=true`
        )
      );
      if (res) {
        const trRegList: TrainingRegistrationMax[] = res.map((apiElm) => {
          const trReg: TrainingRegistrationMax = {
            id: apiElm.id,
            registration_date: moment(apiElm.registration_date),
            status: apiElm.status,
            user: apiElm.user,
            training: {
              id: apiElm.training.id,
              title: apiElm.training.name,
              description: apiElm.training.description,
              duration: apiElm.training.min_hours,
              status: apiElm.training.status,
              startDate: moment(apiElm.training.start),
              endDate: moment(apiElm.training.end),
            },
          };
          return trReg;
        });
        return trRegList;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      return this.handleError(e);
    }
  }

  async getTrainingRegistrationStatusList(): Promise<Status[] | string> {
    try {
      const res = await firstValueFrom(
        this._http.get<Status[]>(
          environment.apiUrl + `/training-registration-status`
        )
      );
      if (res) {
        return res;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      return this.handleError(e);
    }
  }

  async updateTrainingRegistrationStatus(
    trainingRegistrationId: number,
    statusId: number
  ): Promise<boolean | string> {
    try {
      const body = { status_id: statusId };
      const res = await firstValueFrom(
        this._http.put<any>(
          environment.apiUrl +
            `/training-registration/${trainingRegistrationId}`,
          body
        )
      );
      if (res) {
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
          applicants: [],
        };
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      console.log(e);
      return this.handleError(e);
    }
  }

  async updateTrainingField(
    trainingId: number,
    fieldName: string,
    value: string | number | Moment
  ): Promise<boolean | string> {
    try {
      switch (fieldName) {
        case 'title':
          fieldName = 'name';
          break;
        case 'minHours':
          fieldName = 'min_hours';
          break;
      }
      const body = {};
      Object.defineProperty(body, fieldName, {
        value: value,
        enumerable: true,
      });
      const res = await firstValueFrom(
        this._http.put<Training>(
          environment.apiUrl + `/training/${trainingId}`,
          body
        )
      );
      if (res) {
        return true;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      return this.handleError(e);
    }
  }

  async updateTrainingDate(
    trainingId: number,
    valuestart: Moment,
    valueEnd: Moment
  ): Promise<boolean | string> {
    try {
      const body = {
        start: valuestart.utc(true).startOf('d').toISOString(),
        end: valueEnd.utc(true).startOf('d').toISOString(),
      };
      console.log(body);
      const res = await firstValueFrom(
        this._http.put<Training>(
          environment.apiUrl + `/training/${trainingId}`,
          body
        )
      );
      if (res) {
        return true;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      return this.handleError(e);
    }
  }

  async create(newTraining: NewTraining): Promise<boolean | string> {
    try {
      const res = await firstValueFrom(
        this._http.post<any>(environment.apiUrl + `/training`, newTraining)
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


  async getAttendances(user_id: number|null, training_id: number|null): Promise<TrainingAttendance[] | string> {
    try {
      const res = await firstValueFrom(
        this._http.get<any[]>(environment.apiUrl + `/attendance`, {
          params: {
            user_id: user_id ? user_id : '',
            training_id: training_id ? training_id : ''
          }
        })
      );
      if (res) {
        return res.map(apiElm => {
          const elm:TrainingAttendance  = {
            id: apiElm.id,
            status: apiElm.status,
            status_id: apiElm.status_id,
            training_id: apiElm.training_id,
            user_id: apiElm.user_id,
            start: moment(apiElm.start),
            end: moment(apiElm.end),
            user: apiElm.user,
            training: {
              id: apiElm.training.id,
              title: apiElm.training.name,
              description: apiElm.training.description,
              duration: apiElm.training.min_hours,
              status: apiElm.training.status,
              startDate: moment(apiElm.training.start),
              endDate: moment(apiElm.training.end),
            }
          }
          return elm
        });
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
        if (error.error?.errors) return JSON.stringify(error.error?.errors).replace(/[{()}[\]"]/g,'').replace(/(^|\s)\w+(?=:)/g, function(match) {
          return match.charAt(0).toUpperCase() + match.slice(1)
        }).replaceAll(':', ': ');
        errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
      }
    }
    console.error(errorMessage);
    return errorMessage;
  }
}
