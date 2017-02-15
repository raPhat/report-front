import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'day-box',
  templateUrl: './activity-day.component.html',
  styleUrls: ['./activity-day.component.scss']
})
export class ActivityDayComponent implements OnInit {

  @Input() frequency: String = '';
  items = ['b100', 'b75', 'b50', 'b25', ''];

  constructor() { }

  ngOnInit() {
    this.frequency = (this.frequency === '') ? this.items[Math.floor(Math.random() * this.items.length)] : this.frequency;
  }

}
