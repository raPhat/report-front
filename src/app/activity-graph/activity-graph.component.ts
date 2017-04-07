import { TaskService } from '../task/task.service';
import { User } from './../shared/models/user';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'activity-graph',
  templateUrl: './activity-graph.component.html',
  styleUrls: ['./activity-graph.component.scss']
})
export class ActivityGraphComponent implements OnInit {

  month: any = [];

  logs = [];

  @Input() me: User;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.setMonth();

    this.taskService.getTaskLogsByMeId().then((logs: any) => {
      this.logs = logs;
      console.log(logs);
    });
  }

  setMonth() {
    let mydate = new Date(this.me.start);

    // let month = this.start.month;
    let month = mydate.getMonth();
    // let year = this.start.year;
    let year = mydate.getFullYear();

    for(let i=1; i<=12; i++) {
      if (month !== 12) {
        month++;
      } else {
        month = 1;
        year++;
      }
      this.month.push({
        'no': month,
        'year': year
      });
    }
  }

}
