import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AppRoutingModule } from './app.route';
import 'hammerjs';

import { MaterialModule } from '@angular/material';
import { AUTH_PROVIDERS, AuthConfig, AuthHttp, provideAuth, JwtHelper } from 'angular2-jwt';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { DndModule } from 'ng2-dnd';

import { AuthService } from './user/auth.service';
import { UserService } from './user/user.service';
import { AuthGuardService } from './user/auth-guard.service';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftMenuComponent } from './dashboard/left-menu/left-menu.component';
import { RightNotificationComponent } from './dashboard/right-notification/right-notification.component';
import { ActivityGraphComponent } from './activity-graph/activity-graph.component';
import { ActivityMonthComponent } from './activity-graph/activity-month/activity-month.component';
import { ActivityDayComponent } from './activity-graph/activity-month/activity-day/activity-day.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { NewProjectDialogComponent } from './project/new-project-dialog/new-project-dialog.component';
import { IndexComponent } from './index/index.component';
import { CardTableComponent } from './project/card-table/card-table.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
          tokenGetter: (() => localStorage.getItem('auth_token')),
          globalHeaders: [{'Content-Type': 'application/json'}],
     }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    WelcomeComponent,
    DashboardComponent,
    LeftMenuComponent,
    RightNotificationComponent,
    ActivityGraphComponent,
    ActivityMonthComponent,
    ActivityDayComponent,
    NewProjectDialogComponent,
    ProjectDetailComponent,
    IndexComponent,
    CardTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    MyDateRangePickerModule,
    ReactiveFormsModule,
    DndModule.forRoot()
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    // provideAuth({
    //   noJwtError: true,
    // }),
    JwtHelper,
    AuthService,
    UserService,
    AuthGuardService
  ],
  entryComponents: [
    NewProjectDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
