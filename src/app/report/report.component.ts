import { UserService } from './../user/user.service';
import { ReportDateService } from './../shared/services/report-date.service';
import { AuthService } from './../user/auth.service';
import { User } from '../shared/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  me: User;

  dates = [];

  reports = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private reportDateService: ReportDateService
  ) { }

  ngOnInit() {
    this.authService.obMe.subscribe(me => {
      this.me = me;
      this.dates = this.reportDateService.getDateUtilNow(me.start);
      console.log(this.dates);
      this.userService.getMyReport(this.dates).then(obj => {
        console.log(obj);
        this.reports = obj;
      });
    });
    this.authService.me();
  }

}
