import { NonNullAssert } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MinUser, Role, Team } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-management-edit-user',
  templateUrl: './user-management-edit-user.component.html',
  styleUrls: ['./user-management-edit-user.component.scss'],
})
export class UserManagementEditUserComponent implements OnInit, OnDestroy {
  routeParamSubscription: Subscription | null = null;
  userid: number | null = null;
  user: MinUser | null = null;
  profileForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
    ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    team: new FormControl<null | number>(null),
    role: new FormControl<null | number>(null),
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
  teamList: Team[] = [];
  roleList: Role[] = [];
  fieldInEdit: string | null = null;
  fieldLoading: string | null = null;
  requestError = '';

  constructor(private _route: ActivatedRoute, private _user: UserService) {}
  ngOnInit(): void {
    this.initTeamList();
    this.initRoleList();
    this.routeParamSubscription = this._route.paramMap.subscribe(
      (params: ParamMap) => {
        const userid = params.get('userid');
        if (userid) {
          this.userid = parseInt(userid);
          this.initUser();
        } else {
          this.userid = null;
        }
      }
    );
  }

  async initUser() {
    if (!this.userid) return;
    const user = await this._user.getUserById(this.userid);
    if (typeof user === 'string') {
      console.error(user);
    } else {
      this.user = user;
      this.initForm();
    }
  }

  async initTeamList() {
    const teamList = await this._user.getTeamList();
    if (typeof teamList === 'string') {
      console.error(teamList);
    } else {
      this.teamList = teamList;
    }
    console.log(teamList);
  }

  async initRoleList() {
    const roleList = await this._user.getRoleList();
    if (typeof roleList === 'string') {
      console.error(roleList);
    } else {
      this.roleList = roleList;
    }
    console.log(roleList);
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
    if (this.user) {
      this.profileForm.get('username')?.setValue(this.user.username);
      this.profileForm.get('firstname')?.setValue(this.user.firstname);
      this.profileForm.get('lastname')?.setValue(this.user.lastname);
      this.profileForm.get('email')?.setValue(this.user.email);
      if (this.user.team)
        this.profileForm.get('team')?.setValue(this.user.team?.id);
      this.profileForm.get('role')?.setValue(this.user.role.id);
    }
  }

  ngOnDestroy(): void {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
    }
  }

  go2EditField(fieldName: string) {
    const field = this.profileForm.get(fieldName);
    if (!field) {
      this.fieldInEdit = null;
      return;
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
    this.profileForm.get('password')?.reset();
    this.profileForm.get('passwordConfirmation')?.reset();
    this.fieldInEdit = 'password';
  }

  async savePasswordChange() {
    await this.saveEditField('password');
  }

  async saveEditField(fieldName: string) {
    this.requestError = '';
    const field = this.profileForm.get(fieldName);
    if (!field || !this.userid) {
      this.cancelEditField();
      return;
    }
    this.fieldLoading = fieldName;
    const res = await this._user.updateUserField(this.userid, fieldName, field.value);
    if(typeof res === 'string') {
      this.requestError = res;
    } else {
      await this.initUser();
    }
    this.fieldLoading = null;
    this.cancelEditField();
  }
  private checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = this.profileForm.get('password')?.value;
    let confirmPass = this.profileForm.get('passwordConfirmation')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };
}
