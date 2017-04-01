import { ViewTaskDialogComponent } from '../../task/view-task-dialog/view-task-dialog.component';
import { AuthService } from './../../user/auth.service';
import { ProjectService } from './../project.service';
import { Task } from '../../shared/models/task';
import { TaskService } from '../../task/task.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from './../../shared/models/project';
import { CreateTaskDialogComponent } from './../../task/create-task-dialog/create-task-dialog.component';
import { MdDialog } from '@angular/material';
import { DashboardComponent } from './../../dashboard/dashboard.component';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {

  project: Project;
  logs: any[] = [];
  tasks: Task[];
  state: any = {
    'ToDo': 0,
    'Doing': 0,
    'Done': 0
  };

  constructor(
    private dialog: MdDialog,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.project = this.route.snapshot.data['project'];
    this.projectService.obLogs.subscribe(logs => {
      this.logs = logs;
      console.log('logs', logs);
    });
    this.projectService.getLogs(this.project.id);
    this.taskService.obTask.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.state = _.countBy(tasks, 'type.name');
    });
    this.taskService.getTasksByProject(this.project.id);
  }

  ngAfterViewInit() {
  }

  createTaskDialog() {
    let dialogRef = this.dialog.open(CreateTaskDialogComponent);
    dialogRef.componentInstance.project = this.project;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.getLogs(result.project_id);
      }
    });
  }

  deleteTask(task) {
    console.log(task);
    this.taskService.removeTask(task);
  }

  changeToTaskType(task, type) {
    let disableTimeUtil = null;
    if (type !== 'ToDo') {
      let type_id = (type === 'Done') ? 2 : 1;
      let log = _.find(this.logs, {
        'task_type_id': type_id,
        'task_id': task.id
      });
      console.log('log', log);
      disableTimeUtil = log.start;
    }
    this.taskService.changeType(type, task, disableTimeUtil).then(() => {
      this.taskService.getTasksByProject(this.project.id);
      this.projectService.getLogs(this.project.id);
    });
  }

  // after on card-table dragSuccess will call this
  changeTypeSuccess({ task, type }) {
    this.changeToTaskType(task, type);
  }

  openTask(task) {
    let dialogRef = this.dialog.open(
      ViewTaskDialogComponent,
      {
        width: '80%'
      }
    );
    dialogRef.componentInstance.task = task;
    dialogRef.componentInstance.project = this.project;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changeTypeSuccess({
          'task': result.task,
          'type': result.type
        });
      }
    });
  }

}
