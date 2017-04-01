import { TaskService } from '../task.service';
import { DateService } from './../../shared/services/date.service';
import { Project } from './../../shared/models/project';
import { Task } from './../../shared/models/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {

  @ViewChild('descriptionEditor') descriptionEditor;

  action = 'ADD';
  task: Task = {
    name: '',
    description: '',
    start: ''
  };
  project: Project;

  description = '';

  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  private myForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<CreateTaskDialogComponent>,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.myForm = this.formBuilder.group({
      name: [this.task.name, Validators.required],
      description: [this.task.description, Validators.required],
      start: [this.dateService.getMyDate(this.task.start), Validators.required]
    });
  }

  submitForm() {
    let value = this.myForm.value;
    value['description'] = encodeURIComponent(this.descriptionEditor.nativeElement.children[0].innerHTML);
    value['project_id'] = this.project.id;
    this.taskService.addTask(value)
    .then((task: Task) => {
      this.dialogRef.close(task);
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
