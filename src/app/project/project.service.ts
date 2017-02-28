import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MdDialog } from '@angular/material';
import { Project } from './../shared/models/project';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProjectService {

  private endpoint = environment.endpoint + '/api/projects';

  _project: Subject<any> = new Subject();
  obProject: Observable<any>;

  _logs: Subject<any> = new Subject();
  obLogs: Observable<any>;

  constructor(
    private dialog: MdDialog,
    private authHttp: AuthHttp
  ) {
    this.obProject = this._project.asObservable();
    this.obLogs = this._logs.asObservable();
  }

  getProject(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.get(
        this.endpoint + '/' + id
      )
      .map(res => this.handler(res))
      .subscribe((project: Project) => {
        resolve(project);
      }, (error) => {
        reject(error);
      });
    });
  }

  getLogs(id) {
    return this.authHttp.get(this.endpoint + '/logs/' + id)
    .subscribe((res) => {
      this._logs.next(res.json());
    });
  }

  getProjects() {
    return this.authHttp.get(this.endpoint)
    .map(res => this.handler(res))
    .subscribe((projects: Project[]) => {
      this._project.next(projects);
    });
  }

  addProject(value) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(
        this.endpoint,
        value
      )
      .map(res => this.handler(res))
      .subscribe((project: Project) => {
        this.getProjects();
        resolve(project);
      }, (error) => {
        reject(error);
      });
    });
  }

  editProject(value, id) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(
        this.endpoint + '/' + id,
        value
      )
      .map(res => this.handler(res))
      .subscribe((project: Project) => {
        this.getProjects();
        resolve(project);
      }, (error) => {
        reject(error);
      });
    });
  }

  removeProject(id): Promise<any> {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    return new Promise((resolve, reject) => {
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.authHttp.delete(
            this.endpoint + '/' + id
          )
            .map(res => this.handler(res))
            .subscribe((project: Project) => {
              this.getProjects();
              resolve(project);
            }, (error) => {
              reject(error.json());
            });
        } // endif
      });
    });
  }

  private handler(res): any {
    let list = res.json();
    let projects = ( Array.isArray(list) ) ? list.map((project: Project) => new Project(project)) : new Project(list);
    return projects;
  }

}
