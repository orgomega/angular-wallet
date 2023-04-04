import { TestBed } from '@angular/core/testing';

import { DepensesServicesService } from './depenses-services.service';

describe('DepensesServicesService', () => {
  let service: DepensesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepensesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
