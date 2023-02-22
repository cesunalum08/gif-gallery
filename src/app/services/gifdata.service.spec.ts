import { TestBed } from '@angular/core/testing';

import { GIFDataService } from './gifdata.service';

describe('GIFDataService', () => {
  let service: GIFDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GIFDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
