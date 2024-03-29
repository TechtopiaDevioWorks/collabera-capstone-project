import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrOrManagerGuard } from '@core/guards/hr-or-manager.guard';
import { LoggedinGuard } from '@core/guards/loggedin.guard';
import { NotloggedinGuard } from '@core/guards/notloggedin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
      canMatch: [LoggedinGuard]
  },
  {
    path: 'terms-conditions',
    loadChildren: () =>
      import('./pages/terms-conditions/terms-conditions.module').then(
        (m) => m.TermsConditionsModule
      ),
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('./pages/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
    canMatch: [LoggedinGuard, HrOrManagerGuard],
  },
  {
    path: 'trainings',
    loadChildren: () =>
      import('./pages/training-list/training-list.module').then((m) => m.TrainingListModule),
    canMatch: [LoggedinGuard],
  },
  {
    path: 'training-info',
    loadChildren: () =>
      import('./pages/training-info/training-info.module').then((m) => m.TrainingInfoModule),
    canMatch: [LoggedinGuard],
  },
  {
    path: 'training-edit',
    loadChildren: () =>
      import('./pages/training-edit/training-edit.module').then((m) => m.TrainingEditModule),
    canMatch: [LoggedinGuard, HrOrManagerGuard],
  },
  {
    path: 'training-new',
    loadChildren: () =>
      import('./pages/training-new/training-new.module').then((m) => m.TrainingNewModule),
    canMatch: [LoggedinGuard, HrOrManagerGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    canMatch: [LoggedinGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canMatch: [NotloggedinGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
    canMatch: [NotloggedinGuard],
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
