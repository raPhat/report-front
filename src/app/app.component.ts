import { AfterViewInit, Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  options = {
    position: ['bottom', 'left'],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if ( this.authService.isExpired() ) {
      this.authService.clearIdToken();
    }
  }

}
