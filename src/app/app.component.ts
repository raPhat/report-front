import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'app works!';
  cre: any = {
    'email': '',
    'password': ''
  };

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.obMe.subscribe((res) => {
      console.log(res);
    });
  }

  login() {
    this.authService.login(this.cre).then((res) => {
      console.log(res);
    });
  }

}
