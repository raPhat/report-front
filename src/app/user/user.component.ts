import { Subscription } from 'rxjs/Rx';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './../shared/models/user';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  me: User;
  code = '';

  private meSubscribe: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.meSubscribe = this.authService.obMe.subscribe(me => {
      this.me = me;
      console.log(this.me);
    });
    this.authService.me();
  }

  ngOnDestroy() {
    this.meSubscribe.unsubscribe();
  }

  addByCode(code) {
    this.userService.setUserByCode(code).then((me: User) => {
      this.me = me;
      this.code = '';
    }).catch(err => {
      console.error(err);
    });
  }

}
