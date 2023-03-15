import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserManagementFilterComponent } from './features/user-management-filter/user-management-filter.component';
import { UserManagementCardComponent } from './features/user-management-card/user-management-card.component';
import { CoreModule } from '@core/core.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserManagementDeleteUserDialogComponent } from './features/user-management-delete-user-dialog/user-management-delete-user-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserManagementEditUserComponent } from './features/user-management-edit-user/user-management-edit-user.component';
import { UserManagementTrainingHistoryComponent } from './features/user-management-training-history/user-management-training-history.component';
import { UserManagementInviteCardComponent } from './features/user-management-invite-card/user-management-invite-card.component';
import { UserManagementInviteInfoCardComponent } from './features/user-management-invite-info-card/user-management-invite-info-card.component';
import { PastTrainingListModule } from '@shared/past-training-list/past-training-list.module';


@NgModule({
  declarations: [
    UserManagementComponent,
    UserManagementFilterComponent,
    UserManagementCardComponent,
    UserManagementDeleteUserDialogComponent,
    UserManagementEditUserComponent,
    UserManagementTrainingHistoryComponent,
    UserManagementInviteCardComponent,
    UserManagementInviteInfoCardComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    CoreModule,
    MatPaginatorModule,
    MatDialogModule,
    PastTrainingListModule
  ],
  providers: [MatDialog]
})
export class UserManagementModule { }
