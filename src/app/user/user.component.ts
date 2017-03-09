import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './../shared/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  me: User;
  code: string;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService._me.subscribe(me => {
      this.me = me;
      console.log(this.me);
    });
    this.authService.me();
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
