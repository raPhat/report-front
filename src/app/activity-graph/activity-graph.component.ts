import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'activity-graph',
  templateUrl: './activity-graph.component.html',
  styleUrls: ['./activity-graph.component.scss']
})
export class ActivityGraphComponent implements OnInit {

  month: any = [];

  start: any = {
    'month': 8,
    'year': 2016
  };

  constructor() { }

  ngOnInit() {
    this.setMonth();
  }

  setMonth() {
    let month = this.start.month;
    let year = this.start.year;
    for(let i=1; i<=12; i++) {
      if(month !== 12) {
        month++;
      } else {
        month = 1;
        year++;
      }
      this.month.push({
        'no': month,
        'year': year
      })
    }
  }

}
