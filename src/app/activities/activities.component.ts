import { _switch } from 'rxjs/operator/switch';
import { Project } from '../shared/models/project';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  @Input() taskLogs: any[];
  @Input() project: Project;

  constructor() { }

  ngOnInit() {
  }

  getName(type) {
    switch (type) {
      case 'ToDo':
        return 'to do';

      case 'Doing':
        return 'doing';

      case 'Done':
        return 'done';
    }
  }

}
