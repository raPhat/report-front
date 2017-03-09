import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  content = 'Are you sure ?';

  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
  }

}
