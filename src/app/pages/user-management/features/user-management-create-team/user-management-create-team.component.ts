import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Team } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';
@Component({
  selector: 'app-user-management-create-team',
  templateUrl: './user-management-create-team.component.html',
  styleUrls: ['./user-management-create-team.component.scss']
})
export class UserManagementCreateTeamComponent  implements OnInit, OnDestroy {
  teamForm = new FormGroup({
    teamname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
  });
  teamList: Team[] = [];
  requestLoading = false;
  requestError = '';

  constructor(
    private dialogRef: MatDialogRef<UserManagementCreateTeamComponent>,
    private _user: UserService
  ) {}


  ngOnInit(): void {
    this.initTeamList();
  }

  ngOnDestroy(): void {
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
    const teamname = this.teamForm.get('teamname')?.value
    if(!teamname) return;
    this.requestLoading = true;
    this.requestError = '';
    const res = await this._user.createTeam(teamname);
    if(typeof res === 'string') {
      this.requestError = res;
    } else {
      /*this.dialog.open(UserManagementInviteInfoCardComponent, {
        data: {invite: res}
      });*/
      this.dialogRef.close(true);
    }
    this.requestLoading = false;
  }

}
