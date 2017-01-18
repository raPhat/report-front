import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';

import { AuthService } from './user/auth.service';
import { UserService } from './user/user.service';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

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
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
