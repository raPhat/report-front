import { NewProjectDialogComponent } from './../project/new-project-dialog/new-project-dialog.component';
import { MdDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    let dialogRef = this.dialog.open(NewProjectDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('test');
    });
  }

}
