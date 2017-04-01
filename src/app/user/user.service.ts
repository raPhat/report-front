import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { User } from './../shared/models/user';
import { Subject, Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { MdDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  private endpoint = environment.endpoint + '/api/users';

  _user: Subject<any> = new Subject();
  obUser: Observable<any>;

  constructor(
    private dialog: MdDialog,
    private authHttp: AuthHttp
  ) {
    this.obUser = this._user.asObservable();
  }

  getStatisticByUserID(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.get(
        this.endpoint + '/statistic/' + id
      )
        .subscribe((statistic: any) => {
          resolve(statistic.json());
        }, (error) => {
          reject(error);
        });
    });
  }

  getUserByCode(code): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.get(
        this.endpoint + '/code/' + code
      )
        .map(res => this.handler(res))
        .subscribe((user: User) => {
          resolve(user);
        }, (error) => {
          reject(error);
        });
    });
  }

  getUser(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authHttp.get(
        this.endpoint + '/' + id
      )
        .map(res => this.handler(res))
        .subscribe((user: User) => {
          resolve(user);
        }, (error) => {
          reject(error);
        });
    });
  }

  setUserByCode(code): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getUserByCode(code).then((user) => {

        if (!user.id) {
          reject({
            'error': 'user is null'
          });
          return;
        }

        let dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.componentInstance.content = user.name + ' (' + user.role + ') ? ';
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.authHttp.post(
              this.endpoint + '/code',
              {
                'user': user
              }
            )
              .map(res => this.handler(res))
              .subscribe((u: User) => {
                resolve(u);
              }, (error) => {
                reject(error.json());
              });
          } // endif
        });

      }).catch(err => {
        reject(err);
      });
    });
  }

  removeUserOfStudentById(id): Promise<any> {
    return new Promise((resolve, reject) => {
      let dialogRef = this.dialog.open(ConfirmDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.authHttp.delete(
            this.endpoint + '/code/' + id
          )
            .map(res => this.handler(res))
            .subscribe((u: User) => {
              resolve(u);
            }, (error) => {
              reject(error.json());
            });
        } // endif
      });
    });
  }

  private handler(res): any {
    let list = res.json();
    let users = (Array.isArray(list)) ? list.map((user: User) => new User(user)) : new User(list);
    return users;
  }
}
