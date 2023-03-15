import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { User } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
	profileForm = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
		firstname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
		lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
		email: new FormControl('', [Validators.required, Validators.email]),
    team: new FormControl(''),
    role: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(25),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(25),
    ]),
	});
  fieldInEdit: string|null = null;
  fieldLoading: string | null = null;
  currentUser: User | null = null;
  trainableUser = false;
	constructor(private _user: UserService) {}

	ngOnInit(): void {
    this.initForm();
	}

  initForm() {
    this.profileForm.reset();
    this.profileForm.get('username')?.disable();
    this.profileForm.get('firstname')?.disable();
    this.profileForm.get('lastname')?.disable();
    this.profileForm.get('email')?.disable();
    this.profileForm.get('team')?.disable();
    this.profileForm.get('role')?.disable();
    this.profileForm
    .get('passwordConfirmation')
    ?.addValidators(this.checkPasswords);
   this.currentUser = this._user.getUserInfo();
    if(this.currentUser) {
      this.profileForm.get('username')?.setValue(this.currentUser.username);
      this.profileForm.get('firstname')?.setValue(this.currentUser.firstname);
      this.profileForm.get('lastname')?.setValue(this.currentUser.lastname);
      this.profileForm.get('email')?.setValue(this.currentUser.email);
      if (this.currentUser.team)
        this.profileForm.get('team')?.setValue(this.currentUser.team?.name);
      this.profileForm.get('role')?.setValue(this.currentUser.role.name);
      if(this.currentUser.role.id === 1)
        this.trainableUser = true;
    }
  }

  go2EditField(fieldName: string) {
    const field = this.profileForm.get(fieldName);
    if(!field) {
      this.fieldInEdit = null;
      return
    }
    this.fieldInEdit = fieldName;
    field.enable();
  }

  cancelEditField() {
    this.fieldInEdit = null;
    this.fieldLoading = null;
    this.initForm();
  }

  go2ChangePassword() {
    this.cancelEditField();
    this.profileForm.get("password")?.reset();
    this.profileForm.get("passwordConfirmation")?.reset();
    this.fieldInEdit = "password";
  }

  async savePasswordChange() {
    await this.saveEditField("password");
  }

  async saveEditField(fieldName: string) {
    const field = this.profileForm.get(fieldName)
    const user = this._user.getUserInfo();
    if(!field || !user) {
      this.cancelEditField();
      return
    }
    this.fieldLoading = fieldName;
    await this._user.updateUserField(user.id, fieldName, field.value)
    this.fieldLoading = null;
    this.cancelEditField()
  }
  private checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = this.profileForm.get('password')?.value;
    let confirmPass = this.profileForm.get('passwordConfirmation')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };
}
