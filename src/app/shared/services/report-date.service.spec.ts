import { TestBed, inject } from '@angular/core/testing';

import { ReportDateService } from './report-date.service';

describe('ReportDateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportDateService]
    });
  });

  it('should ...', inject([ReportDateService], (service: ReportDateService) => {
    expect(service).toBeTruthy();
  }));
});
