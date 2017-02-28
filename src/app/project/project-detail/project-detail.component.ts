import { ProjectService } from './../project.service';
import { Task } from '../../shared/models/task';
import { TaskService } from '../../task/task.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from './../../shared/models/project';
import { CreateTaskDialogComponent } from './../../task/create-task-dialog/create-task-dialog.component';
import { MdDialog } from '@angular/material';
import { DashboardComponent } from './../../dashboard/dashboard.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailComponent implements OnInit {

  project: Project;
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
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.project = this.route.snapshot.data['project'];
    this.projectService.obLogs.subscribe(logs => {
      console.log(logs);
    });
    this.taskService.obTask.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.state = _.countBy(tasks, 'type.name');
      this.projectService.getLogs(this.project.id);
    });
    this.taskService.getTasksByProject(this.project.id);
  }

  createTaskDialog() {
    let dialogRef = this.dialog.open(CreateTaskDialogComponent);
    dialogRef.componentInstance.project = this.project;
    dialogRef.afterClosed().subscribe(result => { });
  }

  deleteTask(task) {
    console.log(task);
    this.taskService.removeTask(task);
  }

  changeToDoing(task) {
    this.taskService.changeType('Doing', task).then(() => {
      this.taskService.getTasksByProject(this.project.id);
    });
  }

  changeToDone(task) {
    this.taskService.changeType('Done', task).then(() => {
      this.taskService.getTasksByProject(this.project.id);
    });
  }

}
