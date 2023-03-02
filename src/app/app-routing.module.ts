import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
