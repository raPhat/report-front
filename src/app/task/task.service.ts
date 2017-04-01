import { DateDialogComponent } from './../dialogs/date-dialog/date-dialog.component';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MdDialog } from '@angular/material';
import { Task } from './../shared/models/task';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class TaskService {

  private endpoint = environment.endpoint + '/api/tasks';

  _task: Subject<any> = new Subject();
  obTask: Observable<any>;

  constructor(
    private dialog: MdDialog,
    private authHttp: AuthHttp
  ) {
    this.obTask = this._task.asObservable();
  }

  getIconName(typeName) {
    if ( typeName === 'ToDo' ) {
      return 'assignment';
    } else if ( typeName === 'Doing' ) {
      return 'assignment_returned';
    } else if ( typeName === 'Done' ) {
      return 'assignment_turned_in';
    }

    return '';
  }

  getTask(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.get(
        this.endpoint + '/' + id
      )
      .map(res => this.handler(res))
      .subscribe((task: Task) => {
        resolve(task);
      }, (error) => {
        reject(error);
      });
    });
  }

  getTaskLogsByMe() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(this.endpoint + '/logs/me')
      .subscribe((logs: any) => {
        resolve(logs.json());
      });
    });
  }

  getTasks() {
    return this.authHttp.get(this.endpoint)
    .map(res => this.handler(res))
    .subscribe((tasks: Task[]) => {
      this._task.next(tasks);
    });
  }

  getTasksByProject(id) {
    return this.authHttp.get(this.endpoint + '/project/' + id)
    .map(res => this.handler(res))
    .subscribe((tasks: Task[]) => {
      this._task.next(tasks);
    });
  }

  addTask(value) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(
        this.endpoint,
        value
      )
      .map(res => this.handler(res))
      .subscribe((task: Task) => {
        console.log('value', value);
        this.getTasksByProject(task.project_id);
        resolve(task);
      }, (error) => {
        reject(error);
      });
    });
  }

  editTask(value, id) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(
        this.endpoint + '/' + id,
        value
      )
      .map(res => this.handler(res))
      .subscribe((task: Task) => {
        this.getTasksByProject(value.project_id);
        resolve(task);
      }, (error) => {
        reject(error);
      });
    });
  }

  removeTask(task) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        return new Promise((resolve, reject) => {
          this.authHttp.delete(
            this.endpoint + '/' + task.id
          )
          .map(res => this.handler(res))
          .subscribe((t: Task) => {
            this.getTasksByProject(task.project_id);
            resolve(t);
          }, (error) => {
            reject(error.json());
          });
        });
      } // endif
    });
  }

  changeType(type, task, disableUntil = null): Promise<any>  {
    let dialogRef = this.dialog.open(DateDialogComponent);
    if (disableUntil) {
      // ตั้งค่าไม่ให้เลือกวันของ task ที่กำหนดก่อนหน้า
      let util = moment(disableUntil).add(-1, 'days');
      dialogRef.componentInstance.myDatePickerOptions.disableUntil = {
        year: util.year(),
        month: util.month() + 1,
        day: util.date()
      };
    }
    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(start => {
        if (start) {
          this.authHttp.put(
            this.endpoint + '/change' + '/' + task.id,
            {
              type: type,
              start: start
            }
          )
            .map(res => this.handler(res))
            .subscribe((t: Task) => {
              this.getTasksByProject(task.project_id);
              resolve(t);
            }, (error) => {
              reject(error.json());
            });
        } // endif
      });
    });
  }

  private handler(res): any {
    let list = res.json();
    let tasks = ( Array.isArray(list) ) ? list.map((task: Task) => new Task(task)) : new Task(list);
    return tasks;
  }

}
