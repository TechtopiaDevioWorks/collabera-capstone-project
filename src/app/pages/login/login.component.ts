import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(25),
    ]),
  });
  requestLoading = false;
  loginError = '';
  querySubscription: Subscription | null = null;
  constructor(private _user: UserService, private _router: Router, private _toast: ToastrService, private _route:ActivatedRoute) {}

  ngOnInit(): void {
    this.querySubscription = this._route.queryParams.subscribe((params) => {
      console.log(params);
      if (Object.hasOwn(params, 'logout')) {
        this._toast.info('You\'ve been logged out. Come back soon!');
        this._router.navigate([], {
          queryParams: {
            'logout': null,
          },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        })
      } else if (Object.hasOwn(params, 'registerSuccess')) {
        this._toast.info('Your account has been registered succesfully. Login with your username and password!');
        this._router.navigate([], {
          queryParams: {
            'registerSuccess': null,
          },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        })
      }
    });
  }

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
      this.querySubscription = null;
    }
  }

  async onLoginSubmit() {
    if (this.requestLoading) {
      return;
    }
    if (this.loginForm.valid) {
      this.requestLoading = true;
      this.loginError = '';
      const user = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
      };
      if (user.username && user.password) {
        const loginStatus = await this._user.login(
          user.username,
          user.password
        );
        if (loginStatus === true) {
          this._router.navigate(['/dashboard'], {
            queryParams: { loginSuccess: true },
          });
        } else {
          this.loginError = 'Login Failed! User or password is incorrect!';
        }
      }
    }
    this.requestLoading = false;
  }
}
