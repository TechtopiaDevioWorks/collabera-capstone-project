import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Role, Team } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';
import { Subscription } from 'rxjs';
import { UserManagementInviteInfoCardComponent } from '../user-management-invite-info-card/user-management-invite-info-card.component';

@Component({
  selector: 'app-user-management-create-invite-dialog',
  templateUrl: './user-management-create-invite-dialog.component.html',
  styleUrls: ['./user-management-create-invite-dialog.component.scss']
})
export class UserManagementCreateInviteDialogComponent implements OnInit, OnDestroy {
  inviteForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    team: new FormControl<null | number>(null),
    role: new FormControl<null | number>(null, [Validators.required]),
  });
  formSubscription: Subscription | null = null;
  teamList: Team[] = [];
  roleList: Role[] = [];
  requestLoading = false;
  requestError = '';

  constructor(
    private dialogRef: MatDialogRef<UserManagementCreateInviteDialogComponent>,
    private dialog: MatDialog,
    private _user: UserService
  ) {}


  ngOnInit(): void {
    this.initTeamList();
    this.initRoleList();
    this.inviteForm.get('team')?.disable();
    this.inviteForm.get('team')?.addValidators(this.requiredIfNotHR);
    this.inviteForm.get('role')?.valueChanges.subscribe(role_id => {
      if(role_id=== 3) {
        this.inviteForm.get('team')?.disable({emitEvent: false});
        this.inviteForm.get('team')?.setValue(null);
      } else {
        this.inviteForm.get('team')?.enable({emitEvent: false});
      }
    })
  }

  ngOnDestroy(): void {
    if(this.formSubscription) {
      this.formSubscription.unsubscribe();
      this.formSubscription = null;
    }
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

  async initTeamList() {
    const teamList = await this._user.getTeamList();
    if (typeof teamList === 'string') {
      console.error(teamList);
    } else {
      this.teamList = teamList;
    }
    console.log(teamList);
  }

  async onSubmitClick() {
    if (this.requestLoading) {
      return;
    }
    const email = this.inviteForm.get('email')?.value;
    if(!email) return;
    const role = this.inviteForm.get('role')?.value;
    if(!role) return;
    const team = this.inviteForm.get('team')?.value
    if(team === undefined) return;
    this.requestLoading = true;
    this.requestError = '';
    const res = await this._user.invite(email, role, team);
    if(typeof res === 'string') {
      this.requestError = res;
    } else {
      this.dialog.open(UserManagementInviteInfoCardComponent, {
        data: {invite: res}
      });
      this.dialogRef.close(true);
    }
    this.requestLoading = false;
  }

  private requiredIfNotHR: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let role_id = this.inviteForm.get('role')?.value;
    let team_id = this.inviteForm.get('team')?.value;
    if(role_id !== 3 && !team_id) return {requiredNotHr: true}
    else return null;
  };
}
