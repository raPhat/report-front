import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private credentials: any = {
    'email': '',
    'password': ''
  };

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.obMe.subscribe((res) => {
      console.log(res);
    });
  }

  login() {
    this.authService.login(this.credentials).then((res) => {
      console.log(res);
    });
  }

}
