import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  @Input() leftOpen: boolean;
  @Output() toggleLeft = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  toggle(bool: boolean) {
    console.log(bool);
    this.toggleLeft.emit(bool);
  }

}
