import { TestBed } from '@angular/core/testing';

import { RevenuesServicesService } from './revenues-services.service';

describe('RevenuesServicesService', () => {
  let service: RevenuesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevenuesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
