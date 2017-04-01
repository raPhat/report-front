import { Subscription } from 'rxjs/Rx';
import { RegisterDialogComponent } from './../user/register-dialog/register-dialog.component';
import { MdDialog } from '@angular/material';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  private credentials: any = {
    'email': '',
    'password': ''
  };

  loading = false;

  private meSubscribe: Subscription;

  constructor(
    private dialog: MdDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.meSubscribe = this.authService.obMe.subscribe((res) => {
      console.log(res);
      if (res) {
        this.router.navigate(['/dashboard/index', res.id]);
      }
    });
    this.authService.me().catch((error) => {
      console.log(error)
    });
  }

  ngOnDestroy() {
    this.meSubscribe.unsubscribe();
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

  openRegister() {
    let dialogRef = this.dialog.open(RegisterDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      //
    });
  }

}
