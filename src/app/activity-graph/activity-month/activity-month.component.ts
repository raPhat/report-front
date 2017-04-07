import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'month-box',
  templateUrl: './activity-month.component.html',
  styleUrls: ['./activity-month.component.scss']
})
export class ActivityMonthComponent implements OnInit {

  @Input() month: any;
  @Input() logs = [];

  private monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  monthName: String;
  days: any;

  date: any;

  constructor() { }

  ngOnInit() {
    this.daysInMonth(this.month.no, this.month.year);
  }

  daysInMonth(month,year) {
    let date = new Date(year, month, 0);
    this.monthName = this.monthNames[date.getMonth()];
    let days = date.getDate();
    this.days = new Array(days);
  }

}
