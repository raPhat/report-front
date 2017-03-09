import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<RegisterDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['student', Validators.required]
    });
  }

  register() {
    this.authService.register(this.myForm.value).then(() => {
      this.dialogRef.close();
    });
  }

}
