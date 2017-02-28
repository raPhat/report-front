import { Project } from '../../shared/models/project';
import { TaskService } from '../../task/task.service';
import { Task } from './../../shared/models/task';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit {

  // Card Column
  @Input() tasks: Task[];
  @Input() project: Project;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  dropTodo(e) {
    console.log(e);
    this.taskService.changeType('ToDo', e.dragData);
  }

  dropDoing(e) {
    console.log(e);
    this.taskService.changeType('Doing', e.dragData);
  }

  dropDone(e) {
    console.log(e);
    this.taskService.changeType('Done', e.dragData);
  }

  onDragSuccess(index, col) {
    console.log('drag');
    let task: any = this.tasks[index];
    task.task_type_id = col;
    this.taskService.getTasksByProject(this.project.id);
  }

  openTask() {
    alert(1);
  }

}
