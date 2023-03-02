import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup( {
    username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
  })
  requestLoading = false;
  loginError = 'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd';
  constructor(private _user: UserService, private _router: Router) {

  }

  async onLoginSubmit() {
    if(this.requestLoading) {
      return
    }
    if(this.loginForm.valid) {
      this.requestLoading = true;
      this.loginError = '';
      const user = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      }
      /*if(user.username && user.password) {
        const loginStatus = await this._user.login(user.username, user.password)
        if(loginStatus) {
          this._router.navigate(['/dashboard'], {queryParams: {loginSuccess: true}})
        } else {
          this.loginError = 'Login Failed! User or password is incorrect!'
        }
      }*/
    }
    this.requestLoading = false;
  }
}
