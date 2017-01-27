import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return true;
  }

}
