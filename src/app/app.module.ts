import { CommentService } from './task/comment/comment.service';
import { TaskService } from './task/task.service';
import { ProjectGuardService } from './project/project-guard.service';
import { DateService } from './shared/services/date.service';
import { ProjectService } from './project/project.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AppRoutingModule } from './app.route';
import 'hammerjs';

import { MaterialModule } from '@angular/material';
import { AUTH_PROVIDERS, AuthConfig, AuthHttp, provideAuth, JwtHelper } from 'angular2-jwt';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { DndModule } from 'ng2-dnd';
import { MomentModule } from 'angular2-moment';

import { AuthService } from './user/auth.service';
import { UserService } from './user/user.service';
import { AuthGuardService } from './user/auth-guard.service';
import { MediumEditorDirective } from 'angular2-medium-editor/medium-editor.directive';

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
import { CreateTaskDialogComponent } from './task/create-task-dialog/create-task-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { OrderByPipe } from './shared/pipes/order-by.pipe';
import { DateDialogComponent } from './dialogs/date-dialog/date-dialog.component';
import { RegisterDialogComponent } from './user/register-dialog/register-dialog.component';
import { UserCardComponent } from './user/user-card/user-card.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ViewTaskDialogComponent } from './task/view-task-dialog/view-task-dialog.component';
import { CommentComponent } from './task/comment/comment.component';

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
    CardTableComponent,
    CreateTaskDialogComponent,
    ConfirmDialogComponent,
    OrderByPipe,
    DateDialogComponent,
    RegisterDialogComponent,
    UserCardComponent,
    ActivitiesComponent,
    ViewTaskDialogComponent,
    MediumEditorDirective,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    MomentModule
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
    AuthGuardService,
    ProjectService,
    DateService,
    ProjectGuardService,
    TaskService,
    CommentService
  ],
  entryComponents: [
    NewProjectDialogComponent,
    CreateTaskDialogComponent,
    ConfirmDialogComponent,
    DateDialogComponent,
    RegisterDialogComponent,
    ViewTaskDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
