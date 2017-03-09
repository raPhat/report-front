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

  @Output() dropChange = new EventEmitter();
  @Output() createTask = new EventEmitter();

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  onDropSuccess(e, type) {
    console.log(e);
    let task = e.dragData;
    this.dropChange.emit({
      'task': task,
      'type': type
    });
  }

  onDragSuccess(index, col) {
    console.log('drag');
    let task: any = this.tasks[index];
    task.task_type_id = col;
    // this.taskService.getTasksByProject(this.project.id);
  }

  openTask() {
    alert(1);
  }

  openDialog() {
    this.createTask.emit();
  }

}
