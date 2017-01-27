import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AppRoutingModule } from './app.route';
import 'hammerjs';

import { MaterialModule } from '@angular/material';
import { AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';

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

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
          tokenGetter: (() => localStorage.getItem('auth_token')),
          globalHeaders: [{'Content-Type':'application/json'}],
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
    ActivityMonthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthService,
    UserService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
