import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
	registerForm = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
		firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
		lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		token: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
		passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25),]),
	});
	branchList: string[] = [];
	requestLoading = false;
	registerError = '';
  querySubscription: Subscription | null = null;
	constructor(private _user: UserService, private _router: Router, private _route: ActivatedRoute) {}

	ngOnInit(): void {
		this.registerForm
			.get('passwordConfirmation')
			?.addValidators(
				this.checkPasswords
			);
    this.querySubscription = this._route.queryParams.subscribe(params => {
      if(Object.hasOwn(params, 'token')) {
        const tokenForm = this.registerForm.get('token');
        if(tokenForm) {
          tokenForm.setValue(params['token'])
          tokenForm.markAsTouched();
          tokenForm.disable();
        }
      }
      if(Object.hasOwn(params, 'email')) {
        const emailForm = this.registerForm.get('email');
        if(emailForm) {
          emailForm.setValue(params['email'])
          emailForm.markAsTouched();
          emailForm.disable();
        }
      }
    })  
  }

  ngOnDestroy(): void {
    if(this.querySubscription) {
      this.querySubscription.unsubscribe();
      this.querySubscription = null;
    }
  }

	async onRegisterSubmit() {
		if (this.requestLoading) {
			return;
		}
		if (this.registerForm.valid) {
			this.requestLoading = true;
			this.registerError = '';
			const user = {
				username: this.registerForm.get('username')?.value,
				firstname: this.registerForm.get('firstName')?.value,
				lastname: this.registerForm.get('lastName')?.value,
				email: this.registerForm.get('email')?.value,
				password: this.registerForm.get('password')?.value,
				branch: this.registerForm.get('branch')?.value,
				percentage: this.registerForm.get('percentage')?.value,
			};
			if (
				user.username &&
				user.password &&
				user.firstname &&
				user.lastname &&
				user.email &&
				user.branch &&
				user.percentage
			) {
				/*const loginStatus = await this._user.register(
					user.username,
					user.firstname,
					user.lastname,
					user.email,
					user.password,
					user.branch,
					user.percentage
				);
				if (loginStatus) {
					this._router.navigate(['/login'], { queryParams: { registerSuccess: true } });
				} else {
					this.registerError = 'Register Failed! Try again!';
				}*/
			}
		}
		this.requestLoading = false;
	}

	private checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass =this.registerForm.get('password')?.value;
    let confirmPass = this.registerForm.get('passwordConfirmation')?.value
    return pass === confirmPass ? null : { notSame: true }
  }
}
