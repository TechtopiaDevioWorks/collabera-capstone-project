import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrOrManagerGuard } from '@core/guards/hr-or-manager.guard';
import { HrGuard } from '@core/guards/hr.guard';
import { UserManagementEditUserComponent } from './features/user-management-edit-user/user-management-edit-user.component';
import { UserManagementTrainingHistoryComponent } from './features/user-management-training-history/user-management-training-history.component';
import { UserManagementComponent } from './user-management.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
  },
  {
    path: 'edit/:userid',
    component: UserManagementEditUserComponent,
    canMatch: [HrGuard],
  },
  {
    path: 'history/:userid',
    component: UserManagementTrainingHistoryComponent,
    canMatch: [HrOrManagerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
