import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor( private _http: HttpClient, private _user: UserService) { }

  async create(
    type_id: number,
    message: string,
    to_training_id: number|null = null,
    to_attendance_id: number|null = null,
    to_training_registration_id: number|null = null,
    to_user_id: number|null = null,
  ): Promise<Boolean | string> {
    try {
      const currentUser = this._user.getUserInfo();
      if(!currentUser) return 'Unexpected error occured. Try again!';
      const res = await firstValueFrom(
        this._http.post<any>(environment.apiUrl + `/feedback`, {
          message,
          to_training_id,
          to_attendance_id,
          to_training_registration_id,
          to_user_id,
          from_user_id: currentUser.id,
          type_id
        })
      );
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
        if (error.error?.message) return error.error.message;
        errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
      }
    }
    console.error(errorMessage);
    return errorMessage;
  }
}