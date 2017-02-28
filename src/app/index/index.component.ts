import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { ProjectService } from './../project/project.service';
import { Project } from './../shared/models/project';
import { NewProjectDialogComponent } from './../project/new-project-dialog/new-project-dialog.component';
import { MdDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  projects: Project[] = [];

  constructor(
    private dialog: MdDialog,
    private projectSerivce: ProjectService
  ) { }

  ngOnInit() {
    this.projectSerivce.obProject.subscribe((res: Project[]) => {
      this.projects = res;
    });
    this.getProjects();
  }

  getProjects() {
    this.projectSerivce.getProjects();
  }

  removeProject(id) {
    this.projectSerivce.removeProject(id);
  }

  openDialog() {
    let dialogRef = this.dialog.open(NewProjectDialogComponent);
    dialogRef.afterClosed().subscribe(result => { });
  }

  editProjectDialog(project) {
    let dialogRef = this.dialog.open(NewProjectDialogComponent);
    dialogRef.componentInstance.action = 'EDIT';
    dialogRef.componentInstance.project = project;
    dialogRef.afterClosed().subscribe(result => { });
  }

}
