import { IMyOptions } from 'mydatepicker';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-dialog',
  templateUrl: './date-dialog.component.html',
  styleUrls: ['./date-dialog.component.scss']
})
export class DateDialogComponent implements OnInit {

  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy'
  };

  constructor(public dialogRef: MdDialogRef<DateDialogComponent>) { }

  ngOnInit() {
  }

}
