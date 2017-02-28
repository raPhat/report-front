import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { DateService } from '../../shared/services/date.service';
import { Project } from '../../shared/models/project';
import { ProjectService } from '../project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.scss']
})
export class NewProjectDialogComponent implements OnInit {

  action: string = 'ADD';
  project: Project = {
    name: '',
    description: '',
    start: ''
  };

  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  private myForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<NewProjectDialogComponent>,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.myForm = this.formBuilder.group({
      name: [this.project.name, Validators.required],
      description: [this.project.description, Validators.required],
      start: [this.dateService.getMyDate(this.project.start), Validators.required]
    });
  }

  submitForm() {
    this.projectService.addProject(this.myForm.value)
    .then((project: Project) => {
      console.log(project);
      this.dialogRef.close();
    })
    .catch(error => {
      console.log('error', error);
    });
  }

  submitEdit() {
    this.projectService.editProject(this.myForm.value, this.project.id)
    .then((project: Project) => {
      console.log(project);
      this.dialogRef.close();
    })
    .catch(error => {
      console.log('error', error);
    });
  }

  // dateChanged callback function called when the user select the date. This is mandatory callback
  // in this option. There are also optional inputFieldChanged and calendarViewChanged callbacks.
  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

}
