import { ReportComponent } from './report/report.component';
import { User } from './shared/models/user';
import { AuthService } from './user/auth.service';
import { UserComponent } from './user/user.component';
import { ProjectGuardService } from './project/project-guard.service';
import { NgModule } from '@angular/core';

import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { IndexComponent } from './index/index.component';

import { AuthGuardService } from './user/auth-guard.service';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

const appRoutes: Routes = [
    {
      path: '',
      component: WelcomeComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuardService],
      children: [
        {
          path: '',
          redirectTo: 'account',
          pathMatch: 'full'
        },
        {
          path: 'index',
          component: IndexComponent
        },
        {
          path: 'index/:id',
          component: IndexComponent
        },
        {
          path: 'report',
          component: ReportComponent
        },
        {
          path: 'project/:id',
          component: ProjectDetailComponent,
          resolve: {
            project: ProjectGuardService
          }
        },
        {
          path: 'project/:id/:taskId',
          component: ProjectDetailComponent,
          resolve: {
            project: ProjectGuardService
          }
        },
        {
          path: 'account',
          component: UserComponent
        }
      ]
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
