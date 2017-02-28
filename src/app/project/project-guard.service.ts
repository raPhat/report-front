import { ProjectService } from './project.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProjectGuardService implements Resolve<any> {

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.projectService.getProject(route.params['id'])
    .then(data => {
      return data;
    })
    .catch(err => {
      this.router.navigate(['/']);
      return null;
    });
  }

}
