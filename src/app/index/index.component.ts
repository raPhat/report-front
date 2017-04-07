import { TaskService } from '../task/task.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../user/user.service';
import { AuthService } from './../user/auth.service';
import { User } from './../shared/models/user';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { ProjectService } from './../project/project.service';
import { Project } from './../shared/models/project';
import { NewProjectDialogComponent } from './../project/new-project-dialog/new-project-dialog.component';
import { MdDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  projects: Project[] = [];

  me: User;
  user: User;
  statistic: any;

  total_days = 0;

  logs: any = [];

  private id;
  private isMe = false;

  constructor(
    private dialog: MdDialog,
    private projectSerivce: ProjectService,
    private authService: AuthService,
    private userSerivce: UserService,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe((val) => {
      this.id = val['id'];
    });

    this.authService.obMe.subscribe(me => {
      this.me = me;
      if (!this.id) {
        this.projectSerivce.getMyProjects();
        // เซทสถิติ
        this.userSerivce.getStatisticByUserID(me.id).then((statistic) => {
          this.statistic = statistic;
        });
        this.user = me;
        this.isMe = true;
      } else {
        this.isMe = (this.id === me.id.toString());
      }

      if (me.role !== 'student') {
        this.taskService.getTaskLogsByMe().then(logs => {
          this.logs = logs;
        });
      }

      this.total_days = moment().diff(me.start, 'days');
    });
    this.authService.me();

    this.projectSerivce.obProject.subscribe((res: Project[]) => {
      this.projects = res;
    });

    if (this.id) {
      this.userSerivce.getUser(this.id).then((user: User) => {
        this.user = user;
        this.projectSerivce.getProjectsByUserID(user.id);
        // เซทสถิติ
        this.userSerivce.getStatisticByUserID(user.id).then((statistic) => {
          this.statistic = statistic;
        });
      });
    }
  }

  getProjects() {
    this.projectSerivce.getProjects();
  }

  removeProject(id) {
    this.projectSerivce.removeProject(id);
  }

  openDialog() {
    let dialogRef = this.dialog.open(NewProjectDialogComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }

  editProjectDialog(project) {
    let dialogRef = this.dialog.open(NewProjectDialogComponent);
    dialogRef.componentInstance.action = 'EDIT';
    dialogRef.componentInstance.project = project;
    dialogRef.afterClosed().subscribe(result => { });
  }

  countBy(tasks, typeName) {
    const state = _.countBy(tasks, 'type.name');
    return state[typeName];
  }

}
