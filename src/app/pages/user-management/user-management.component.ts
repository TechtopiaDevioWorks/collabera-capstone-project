import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Invite, MinUser, Team } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';
import { firstValueFrom } from 'rxjs';
import { UserManagementCreateInviteDialogComponent } from './features/user-management-create-invite-dialog/user-management-create-invite-dialog.component';
import { UserManagementCreateTeamComponent } from './features/user-management-create-team/user-management-create-team.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit{
  userList: MinUser[] = [];
  inviteList: Invite[] = [];
  currentUser: MinUser | null = null;
  userRoleId: number | null = null;
  teamList: Team[] = [];
  pageSize = 10;
  pageNumber = 0;
  listLength = 0;
  selectedTab: 'Users'|'Invites'|'Teams' ='Users';

  constructor(private _user: UserService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.initUserList();
  }

  async initUserList() {
    const userRole = await this._user.getUserRole();
    this.userRoleId = userRole ? userRole.id : null;
    const res = await this._user.getUserList();
    this.currentUser = this._user.getUserInfo();
    if(typeof res === 'string') {
      //err
    } else {
      this.userList = res;
      this.listLength = res.length;
    }

  }

  async initTeamList() {
    if(this.userRoleId !== 3) return;
    const teamList = await this._user.getTeamList();
    if (typeof teamList === 'string') {
      console.error(teamList);
    } else {
      this.teamList = teamList;
      this.listLength = teamList.length;
    }
  }

  async initInviteList() {
    if(this.userRoleId !== 3) return;
    const inviteList = await this._user.getInviteList();
    if (typeof inviteList === 'string') {
      console.error(inviteList);
    } else {
      this.inviteList = inviteList;
      this.listLength = inviteList.length;
    }
  }

  onPaginatorChange(e: PageEvent) {
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    //this.refreshList();
  }

  async onInviteClick() {
    const res = await firstValueFrom(this.dialog.open(UserManagementCreateInviteDialogComponent, {
    }).afterClosed());
    if (res === true) this.refreshList('Invites');
  }

  async onCreateTeamClick() {
    const res = await firstValueFrom(this.dialog.open(UserManagementCreateTeamComponent, {}).afterClosed());
    if (res === true) this.refreshList('Teams');
  }

  refreshList(tabName: 'Users'|'Invites'|'Teams') {
    if(this.selectedTab !== tabName) return;
    switch(tabName) {
      case 'Users':
        this.initUserList();
        break;
      case 'Invites':
        this.initInviteList();
        break;
      case 'Teams':
        this.initTeamList();
        break;
    }
  }

  changeTab(tabName: 'Users'|'Invites'|'Teams') {
    this.selectedTab = tabName;
    this.pageNumber = 0;
    this.refreshList(tabName);
  }
}
