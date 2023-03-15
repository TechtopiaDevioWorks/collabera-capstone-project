import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MinUser } from '@core/interfaces/user';
import { UserService } from '@core/services/user.service';
import { UserManagementInviteCardComponent } from './features/user-management-invite-card/user-management-invite-card.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit{
  userList: MinUser[] = [];
  currentUser: MinUser | null = null;
  userRoleId: number | null = null;
  pageSize = 10;
  pageNumber = 0;
  userListLength = 0;

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
      this.userListLength = res.length;
    }
  }
  onPaginatorChange(e: PageEvent) {
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    //this.refreshList();
  }

  onInviteClick() {
    this.dialog.open(UserManagementInviteCardComponent, {
    })
  }
}
