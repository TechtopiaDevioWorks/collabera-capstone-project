import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingRegistrationMax } from '@core/interfaces/training';
import {
  Invite,
  MinUser,
  NewUser,
  Role,
  Team,
  User,
} from '@core/interfaces/user';
import * as moment from 'moment';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: User | null = null;
  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  initialized = false;
  constructor(private _router: Router, private _http: HttpClient) {}

  getUserInfo(): User | null {
    return this._user;
  }

  async getUserRole(): Promise<Role | null> {
    await this.init();
    if (!this._user) return null;
    return this._user.role;
  }

  async getLoginStatus(): Promise<boolean> {
    await this.init();
    return this.loginStatus.getValue();
  }

  async init() {
    if (this.initialized === false) {
      await this.checkUser();
      this.initialized = true;
    }
  }

  async checkUser(): Promise<boolean | string> {
    if (this._user) {
      this.loginStatus.next(true);
      return true;
    } else {
      if (localStorage) {
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
          const tokenRes = await this.checkUserToken(userToken);
          if (tokenRes === true) {
            this.loginStatus.next(true);
            return true;
          } else {
            this.logout(null);
            return tokenRes;
          }
        } else {
          this.logout(null);
          return false;
        }
      } else {
        this.logout(null);
        return false;
      }
    }
  }

  private async checkUserToken(userToken: string): Promise<true | string> {
    try {
      const res = await firstValueFrom(
        this._http.put<User>(environment.apiUrl + `/token-login`, {
          token: userToken,
        })
      );
      if (res) {
        this._user = res;
        return true;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      return this.handleError(e);
    }
  }

  logout(message: 'logout' | null) {
    if (localStorage) {
      localStorage.removeItem('userToken');
    }
    this._user = null;
    this.loginStatus.next(false);
    let queryParameters = {};
    switch (message) {
      case 'logout':
        queryParameters = {
          logout: true,
        };
        break;
    }
    this._router.navigate(['/login'], { queryParams: queryParameters });
  }

  saveUserLocal() {
    if (!this._user) return;
    if (localStorage) {
      localStorage.setItem('userToken', this._user.token);
    }
  }

  async login(username: string, password: string): Promise<boolean | string> {
    try {
      const res = await firstValueFrom(
        this._http.put<User>(environment.apiUrl + `/login`, {
          username,
          password,
        })
      );
      if (res) {
        this._user = res;
        this.loginStatus.next(true);
        this.saveUserLocal();
        return true;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      console.log(e);
      return this.handleError(e);
    }
  }

  async register(newUser: NewUser): Promise<boolean | string> {
    try {
      const res = await firstValueFrom(
        this._http.post<any>(environment.apiUrl + `/user`, newUser)
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

  async createTeam(teamname: string): Promise<boolean | string> {
    try {
      const res = await firstValueFrom(
        this._http.post<any>(environment.apiUrl + `/team`, {name: teamname})
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

  async deleteInvite(inviteId: number): Promise<boolean | string> {
    try {
      const res = await firstValueFrom(
        this._http.delete<any>(environment.apiUrl + `/invite/${inviteId}`)
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

  async deleteTeam(teamid: number): Promise<boolean | string> {
    try {
      const res = await firstValueFrom(
        this._http.delete<any>(environment.apiUrl + `/team/${teamid}`)
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

  async delete(userId: number): Promise<boolean | string> {
    try {
      if (userId === this._user?.id) return "Can't delete your own user!";
      const res = await firstValueFrom(
        this._http.delete<any>(environment.apiUrl + `/user/${userId}`)
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

  async invite(
    email: string,
    role_id: number,
    team_id: number | null
  ): Promise<Invite | string> {
    try {
      const res = await firstValueFrom(
        this._http.post<any>(environment.apiUrl + `/invite`, {
          email,
          role_id,
          team_id,
        })
      );
      if (res && res.invite) {
        const invite: Invite = res.invite;
        return invite;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      return this.handleError(e);
    }
  }

  async updateUserField(
    userId: number,
    fieldName: string,
    value: string | number
  ): Promise<boolean | string> {
    try {
      if (fieldName === 'team') fieldName = 'team_id';
      if (fieldName === 'role') fieldName = 'role_id';
      const body = {};
      Object.defineProperty(body, fieldName, {
        value: value,
        enumerable: true,
      });
      const res = await firstValueFrom(
        this._http.put<User>(
          environment.apiUrl +
            `/user${userId === this._user?.id ? '' : `/${userId}`}`,
          body
        )
      );
      if (res) {
        if (this._user && userId === this._user.id)
          await this.checkUserToken(this._user.token);
        return true;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      return this.handleError(e);
    }
  }

  async getTrainingHistory(
    userid: number,
    history = false
  ): Promise<TrainingRegistrationMax[] | string> {
    try {
      const res = await firstValueFrom(
        this._http.get<any[]>(
          environment.apiUrl +
            `/training-history${userid === this._user?.id ? '' : `/${userid}`}`
        )
      );
      if (res) {
        let trainingList = res.map((apiElm) => {
          const elm: TrainingRegistrationMax = {
            id: apiElm.id,
            registration_date: moment(apiElm.registration_date),
            training: {
              id: apiElm.training.id,
              title: apiElm.training.name,
              description: apiElm.training.description,
              duration: apiElm.training.min_hours,
              status: apiElm.training.status,
              startDate: moment(apiElm.training.start),
              endDate: moment(apiElm.training.end),
            },
            user: apiElm.user,
            status: apiElm.status,
          };
          return elm;
        });
        if (history) {
          const currentMoment = moment.utc();
          trainingList = trainingList.filter(el => el.training.endDate.isBefore(currentMoment, 'day'))
        }
        return trainingList;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      console.log(e);
      return this.handleError(e);
    }
  }

  async getUserList(): Promise<MinUser[] | string> {
    try {
      const res = await firstValueFrom(
        this._http.get<MinUser[]>(environment.apiUrl + `/user?expand=true`)
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

  async getTeamList(): Promise<Team[] | string> {
    try {
      const res = await firstValueFrom(
        this._http.get<Team[]>(environment.apiUrl + `/team`)
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

  async getInviteList(): Promise<Invite[] | string> {
    try {
      const res = await firstValueFrom(
        this._http.get<Invite[]>(environment.apiUrl + `/invite`)
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

  async getRoleList(): Promise<Role[] | string> {
    try {
      const res = await firstValueFrom(
        this._http.get<Role[]>(environment.apiUrl + `/role`)
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

  async getUserById(userId: number): Promise<MinUser | string> {
    try {
      const res = await firstValueFrom(
        this._http.get<MinUser>(
          environment.apiUrl + `/user/${userId}?expand=true`
        )
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

  private delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
}
