import { IMyOptions } from 'mydatepicker';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';
import { UserService } from './../user.service';
import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  private endpoint = environment.endpoint;

  type = 'ADD';

  options: NgUploaderOptions;
  response: any;
  responseSign: any;

  myForm: FormGroup;

  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  user: User;

  constructor(
    @Inject(NgZone) private zone: NgZone,
    public dialogRef: MdDialogRef<RegisterDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.options = new NgUploaderOptions({
      url: this.endpoint + '/api/images',
      filterExtensions: true,
      allowedExtensions: ['jpg', 'png'],
      autoUpload: true,
      fieldName: 'file',
      fieldReset: true,
      maxUploads: 2,
      method: 'POST',
      previewUrl: true,
      withCredentials: false
    });
  }

  ngOnInit() {
    if (this.user) {
      this.setValueForm();
    } else {
      this.setForm();
    }
  }

  setForm() {
    this.myForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      description: ['', Validators.required],
      company: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: ['', Validators.required],
      sign: ['', Validators.required],
      start: ['', Validators.required],
      role: ['student', Validators.required]
    });
  }

  setValueForm() {
    this.myForm = this.formBuilder.group({
      first_name: [this.user.first_name, Validators.required],
      last_name: [this.user.last_name, Validators.required],
      description: [this.user.description, Validators.required],
      company: [this.user.company, Validators.required],
      position: [this.user.position, Validators.required],
      email: [this.user.email, Validators.required],
      password: ['', Validators.required],
      avatar: ['', Validators.required],
      sign: ['', Validators.required],
      start: [this.user.start, Validators.required],
      role: [this.user.role, Validators.required]
    });
  }

  register() {
    this.authService.register(this.myForm.value).then(() => {
      this.dialogRef.close();
    });
  }

  edit() {
    this.userService.update(this.myForm.value, this.user.id).then(() => {
      this.dialogRef.close();
    });
  }

  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          this.response = JSON.parse(data.response);
          this.myForm.controls['avatar'].setValue(this.response);
        }
      });
    });
  }

  handleSignUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          this.responseSign = JSON.parse(data.response);
          this.myForm.controls['sign'].setValue(this.responseSign);
          console.log('sign: ', this.responseSign);
        }
      });
    });
  }

  getAvatar() {
    if ( !this.user ) {
      return (this.response ) ? this.endpoint + '/uploads/' + this.response : './assets/images/avatar.svg';
    }
    return (this.response ) ? this.endpoint + '/uploads/' + this.response : this.endpoint + '/uploads/' + this.user.avatar;
  }

}
