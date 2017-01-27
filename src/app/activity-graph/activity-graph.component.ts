import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'activity-graph',
  templateUrl: './activity-graph.component.html',
  styleUrls: ['./activity-graph.component.scss']
})
export class ActivityGraphComponent implements OnInit {

  month: any[] = new Array(12);
  day: any[] = new Array(30);

  constructor() { }

  ngOnInit() {
  }

}
