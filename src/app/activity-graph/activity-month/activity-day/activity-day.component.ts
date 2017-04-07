import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'day-box',
  templateUrl: './activity-day.component.html',
  styleUrls: ['./activity-day.component.scss']
})
export class ActivityDayComponent implements OnInit, OnChanges {

  @Input() frequency: String = '';
  @Input() logs = [];
  items = ['b100', 'b75', 'b50', 'b25', ''];

  @Input() day;
  @Input() month;
  @Input() year;

  date;

  todayLogs = [];

  constructor() { }

  ngOnInit() {
    // this.frequency = (this.frequency === '') ? this.items[Math.floor(Math.random() * this.items.length)] : this.frequency;
    let date = this.year + '-' + this.month + '-' + this.day;
    this.date = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['logs']) {
      let logs = changes['logs'].currentValue;
      this.todayLogs = _.filter(this.logs, ['start', this.date]);
      this.setStyle();
    }
  }

  setStyle() {
    if (this.todayLogs.length > 10) {
      this.frequency = 'b100';
    } else if (this.todayLogs.length > 7) {
      this.frequency = 'b75';
    } else if (this.todayLogs.length > 4) {
      this.frequency = 'b50';
    } else if (this.todayLogs.length > 0) {
      this.frequency = 'b25';
    } else {
      this.frequency = '';
    }
  }

}
