import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.scss']
})
export class CardTableComponent implements OnInit {

  // Card Column
  todo: any[] = [1, 2, 3];
  doing: any[] = [1];
  done: any[] = [1, 2];

  constructor() { }

  ngOnInit() {
  }

  dropTodo(e) {
    console.log(e);
    this.todo.push(e);
  }

  dropDoing(e) {
    console.log(e);
    this.doing.push(e);
  }

  dropDone(e) {
    console.log(e);
    this.done.push(e);
  }

  onDragSuccess(index, col) {
    console.log('drag')
    col.splice(index, 1);
  }

  openTask() {
    alert(1);
  }

}
