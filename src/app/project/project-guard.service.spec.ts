/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectGuardService } from './project-guard.service';

describe('ProjectGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectGuardService]
    });
  });

  it('should ...', inject([ProjectGuardService], (service: ProjectGuardService) => {
    expect(service).toBeTruthy();
  }));
});
