import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  leftOpen: boolean = false;
  rightOpen: boolean = false;

  constructor() { }

  ngOnInit() {
    this.setPosition();
  }

  toggleLeft(e) {
    console.log(e);
    this.leftOpen = e;
  }

  toggleRight(e) {
    this.rightOpen = e;
  }

  @HostListener('window:resize', ['$event'])
  setPosition() {
    if(window.innerWidth > 991) {
      this.leftOpen = true;
      this.rightOpen = true;
    } else {
      this.leftOpen = false;
      this.rightOpen = false;
    }
  }

}
