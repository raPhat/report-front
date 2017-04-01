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

  meInfo: User;

  private _me: Subject<any> = new Subject();
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

  register(user: any): Promise<any> {
    return this.http.post(
      this.endpoint + '/register',
      user,
      this.options
    ).toPromise()
    .then((res) => {
      let ob = res.json();
      this.login({
        email: user.email,
        password: user.password
      });
      return ob;
    }).catch(this.handleError);
  }

  me() {
    return new Promise((resolve, reject) => {
      if (!this.getIdToken()) { reject(false); }
      this.authHttp.get(this.endpoint + '/me').subscribe((res: any) => {
        let me = res.json();
        this._me.next(me);
        this.meInfo = me;
        resolve(me);
      });
    });
  }

  logout() {
    this.clearIdToken();
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
    if (!this.getIdToken()) { return true; }
    return this.jwtHelper.isTokenExpired(this.getIdToken());
  }

}
