import { environment } from './../../../environments/environment';
import { UserService } from './../user.service';
import { User } from '../../shared/models/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  private endpoint = environment.endpoint;

  @Input() user: User;
  @Output() onRemove = new EventEmitter();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  remove() {
    this.userService.removeUserOfStudentById(this.user.id).then((me) => {
      this.onRemove.emit(me);
    });
  }

}
