import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NewUser, Role, User } from '@core/interfaces/user';
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
      await this.delay(1000);
      const res = await firstValueFrom(
				this._http.put<User>(environment.apiUrl + `/token-login`, {token: userToken})
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
				this._http.put<User>(environment.apiUrl + `/login`, {username, password})
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
      await this.delay(1000);
      const res = newUser;
      if (res) {
        return true;
      }
      return 'Unexpected error occured. Try again!';
    } catch (e) {
      return this.handleError(e);
    }
  }

  private handleError(error: HttpErrorResponse | unknown): string {
    let errorMessage = 'Unexpected error occured. Try again!';
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        errorMessage = `An error occurred: ${error.error}`;
      } else {
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
