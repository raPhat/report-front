import { ViewTaskDialogComponent } from './../../task/view-task-dialog/view-task-dialog.component';
import { MdDialog } from '@angular/material';
import { Project } from '../../shared/models/project';
import { TaskService } from '../../task/task.service';
import { Task } from './../../shared/models/task';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit {

  // Card Column
  @Input() tasks: Task[];
  @Input() project: Project;
  @Input() isMe = false;

  @Output() dropChange = new EventEmitter();
  @Output() createTask = new EventEmitter();

  constructor(
    private dialog: MdDialog,
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  onDropSuccess(e, type) {
    if (this.isMe) {
      let task = e.dragData;
      this.dropChange.emit({
        'task': task,
        'type': type
      });
    }
  }

  onDragSuccess(index, col) {
    if (this.isMe) {
      console.log('drag');
      let task: any = this.tasks[index];
      task.task_type_id = col;
      // this.taskService.getTasksByProject(this.project.id);
    }
  }

  openTask(task) {
    let dialogRef = this.dialog.open(ViewTaskDialogComponent,
      {
        width: '80%'
      });
    dialogRef.componentInstance.task = task;
    dialogRef.componentInstance.project = this.project;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dropChange.emit({
          'task': result.task,
          'type': result.type
        });
      }
    });
  }

  openDialog() {
    this.createTask.emit();
  }

}
