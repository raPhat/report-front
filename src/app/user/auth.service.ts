import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

import { User } from '../shared/models/user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private endpoint = environment.endpoint + '/api/auth';

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  _me: Subject<any> = new Subject();
  obMe: Observable<any>;

  private keyStorage = 'auth_token';

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private jwtHelper: JwtHelper
  ) {
    this.obMe = this._me.asObservable();
  }

  login(credentials: Object): Promise<any> {
    return this.http.post(
      this.endpoint,
      credentials,
      this.options
    ).toPromise()
    .then((res) => {
      let ob = res.json();
      this.setIdToken(ob.token);
      this.me();
      return ob;
    }).catch(this.handleError);
  }

  me() {
    if(!this.getIdToken()) { return; }
    this.authHttp.get(this.endpoint + '/me').subscribe((res: any) => {
      // let me = JSON.parse(res._body);
      let me = res.json();
      me = me.user;
      this._me.next(new User(
        me.id,
        me.email,
        me.name,
        me.created_at,
        me.updated_at
      ));
    });
  }

  logout() {
    this.clearIdToken();
    this._me.next();
  }

  setIdToken(token) {
    localStorage.setItem(this.keyStorage, token);
  }

  getIdToken() {
    return localStorage.getItem(this.keyStorage);
  }

  clearIdToken() {
    localStorage.removeItem(this.keyStorage);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);

    return Promise.reject(error.message || error);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  isExpired() {
    if (!this.getIdToken()) { return false; }
    return this.jwtHelper.isTokenExpired(this.getIdToken());
  }

}
