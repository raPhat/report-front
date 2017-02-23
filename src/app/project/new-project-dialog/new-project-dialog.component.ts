import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.scss']
})
export class NewProjectDialogComponent implements OnInit {

  private myDateRangePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  private myForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<NewProjectDialogComponent>,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      range: ['', Validators.required]
    });
  }

  submitForm() {
    console.log(this.myForm);
  }

  // dateRangeChanged callback function called when the user apply the date range. This is
  // mandatory callback in this option. There are also optional inputFieldChanged and
  // calendarViewChanged callbacks.
  onDateRangeChanged(event: IMyDateRangeModel) {
    // event properties are: event.beginDate, event.endDate, event.formatted,
    // event.beginEpoc and event.endEpoc
  }

}
