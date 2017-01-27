import { NgModule } from '@angular/core';

import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuardService } from './user/auth-guard.service';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    {
      path: '',
      component: WelcomeComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: '*',
      component: WelcomeComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
