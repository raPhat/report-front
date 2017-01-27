import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  private credentials: any = {
    'email': '',
    'password': ''
  };

  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.obMe.subscribe((res) => {
      console.log(res);
      if(res) {
        this.router.navigate(['/dashboard']);
      }
    });
    this.authService.me();
  }

  login() {
    this.loading = true;
    this.authService.login(this.credentials).then((res) => {
      console.log(res);
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

}
