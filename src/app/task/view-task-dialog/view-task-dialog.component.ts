import { CommentService } from './../comment/comment.service';
import { ViewChild } from '@angular/core/src/metadata/di';
import { AuthService } from './../../user/auth.service';
import { Project } from '../../shared/models/project';
import { Task } from './../../shared/models/task';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-task-dialog',
  templateUrl: './view-task-dialog.component.html',
  styleUrls: ['./view-task-dialog.component.scss']
})
export class ViewTaskDialogComponent implements OnInit {

  @ViewChild('textComment') textComment;

  task: Task;
  project: Project;

  text = '';

  comments = [];

  loading = false;

  constructor(
    public dialogRef: MdDialogRef<ViewTaskDialogComponent>,
    private authService: AuthService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.commentService.obComment.subscribe((comments: Comment[]) => {
      this.comments = comments;
      this.loading = false;
    });
    this.commentService.getCommentByTask(this.task.id);
  }

  comment() {
    this.loading = true;
    this.commentService.addComment({
      'text': encodeURIComponent(this.textComment.nativeElement.children[0].innerHTML),
      'task_id': this.task.id
    });
  }

  action(type) {
    this.dialogRef.close({
      'type': type,
      'task': this.task
    });
  }

}
