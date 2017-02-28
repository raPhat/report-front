import { ProjectGuardService } from './project/project-guard.service';
import { NgModule } from '@angular/core';

import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { IndexComponent } from './index/index.component';

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
      canActivate: [AuthGuardService],
      children: [
        {
          path: '',
          redirectTo: 'index',
          pathMatch: 'full'
        },
        {
          path: 'index',
          component: IndexComponent
        },
        {
          path: 'project/:id',
          component: ProjectDetailComponent,
          resolve: {
            project: ProjectGuardService
          }
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
