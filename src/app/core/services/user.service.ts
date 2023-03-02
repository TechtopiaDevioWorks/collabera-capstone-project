import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser, User } from '@core/interfaces/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User | null = null;
  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor() { }

  getUserInfo(): User | null {
    return this._user;
  }

  async login(username: string, password: string): Promise<boolean | string> {
    try {
      await this.delay(1000)
			let res: User|null = {
        firstname: 'Alin',
        lastname: 'Manea',
        username: 'amanea',
        token: 'randomtoken',
        email: 'amanea@techtopia.ro',
        role: {
          id: 3,
          name: 'HR'
        }
      }
      if(username !== 'amanea' || password !=='amanea'){
        res = null;
      }
			if (res) {
        this._user = res;
        this.loginStatus.next(true);
        return true;
			}
      return 'Unexpected error occured. Try again!';
		} catch (e) {
			return this.handleError(e);
		}
  }

  async register(newUser: NewUser): Promise<boolean | string> {
    try {
      await this.delay(1000)
			const res = newUser
			if (res) {
        return true;
			}
      return 'Unexpected error occured. Try again!';
		} catch (e) {
			return this.handleError(e);
		}
  }

  private handleError(error: HttpErrorResponse | unknown): string {
    let errorMessage= 'Unexpected error occured. Try again!';
		if (error instanceof HttpErrorResponse) {
			if (error.status === 0) {
        errorMessage = `An error occurred: ${error.error}`;
			} else {
				errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
			}
		}
    console.error(errorMessage)
    return errorMessage
	}

  private delay(ms: number) {
		return new Promise((res) => setTimeout(res, ms));
	}
}
