import { Comment } from './../../shared/models/comment';
import { MdDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable()
export class CommentService {

  private endpoint = environment.endpoint + '/api/comments';

  _comment: Subject<any> = new Subject();
  obComment: Observable<any>;

  constructor(
    private dialog: MdDialog,
    private authHttp: AuthHttp
  ) {
    this.obComment = this._comment.asObservable();
  }

  getCommentByTask(id) {
    return this.authHttp.get(this.endpoint + '/task/' + id)
    .map(res => this.handler(res))
    .subscribe((comments: Comment[]) => {
      this._comment.next(comments);
    });
  }

  addComment(value) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(
        this.endpoint,
        value
      )
      .map(res => this.handler(res))
      .subscribe((comment: Comment) => {
        console.log(comment);
        this.getCommentByTask(comment.task_id);
        resolve(comment);
      }, (error) => {
        reject(error);
      });
    });
  }

  private handler(res): any {
    let list = res.json();
    let comments = ( Array.isArray(list) ) ? list.map((comment: Comment) => new Comment(comment)) : new Comment(list);
    return comments;
  }

}
