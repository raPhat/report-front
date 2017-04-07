import { NotificationsService } from 'angular2-notifications';
import { User } from '../../shared/models/user';
import { AuthService } from '../../user/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as _ from 'lodash';

@Component({
  selector: 'app-right-notification',
  templateUrl: './right-notification.component.html',
  styleUrls: ['./right-notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RightNotificationComponent implements OnInit {

  noti: FirebaseObjectObservable<any[]>;

  me: User;

  notifies: any = [];

  firstTime = true;
  temp: any;

  list = ['Today', 'All'];

  constructor(
    private af: AngularFire,
    private authService: AuthService,
    private _notificationsService: NotificationsService
  ) {
    this.me = this.authService.meInfo;
    if ( this.me ) {
      this.obNoti();
    } else {
      this.authService.obMe.subscribe(me => {
        this.me = me;
        this.obNoti();
      });
    }
  }

  obNoti() {
    this.noti = this.af.database.object('/user/' + this.me.id, { preserveSnapshot: true });
    this.noti.subscribe((snapshot: any) => {
      console.log(snapshot.key);
      console.log(snapshot.val());

      if (this.firstTime) {
        this.temp = snapshot.val();
      }

      if ( !_.isEqual(this.temp, snapshot.val()) ) {
        this._notificationsService.alert(
            'Notification',
            'You got 1 notification.'
        );
        this.authService.getNotifies();
      }

      this.temp = snapshot.val();
      this.firstTime = false;

    });
  }

  ngOnInit() {
    this.authService.obNotifies.subscribe((notifies) => {
      this.notifies = notifies;
    });
    this.authService.getNotifies();
  }

}
