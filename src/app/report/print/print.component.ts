import { environment } from '../../../environments/environment';
import { Project } from './../../shared/models/project';
import { User } from '../../shared/models/user';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  private endpoint = environment.endpoint;

  @Input() user: User;
  @Input() no: number;
  @Input() report: any;
  @Input() project: Project;

  randDone = 0;
  randPG = 0;

  doneLogs = [];
  inProgressLogs = [];

  comments = [];

  start = [
    'I am doing about',
    'This week, I am working on',
    'I am making a progress on'
  ];

  constructor() { }

  ngOnInit() {
    this.randDone = Math.floor(Math.random() * 2);
    this.randPG = Math.floor(Math.random() * 3);

    // console.log(this.report);

    this.doneLogs = _.filter(this.report.logs, ['task_type_id', 3]);
    this.inProgressLogs = _.filter(this.report.logs, (log: any) => {
      let l = _.find(this.doneLogs, ['task_id', log.task_id]);
      return log.task_type_id === 2 && typeof l === 'undefined';
    });

    _.forEach(this.doneLogs.concat(this.inProgressLogs), (log) => {
      _.forEach(log.task.comments, (comment) => {
        this.comments.push(comment);
      });
    });

    console.log('this.inProgressLogs', this.inProgressLogs);
    console.log('this.doneLogs', this.doneLogs);
  }

}
