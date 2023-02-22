import { TestBed } from '@angular/core/testing';

import { SearchGiphyService } from './search-giphy.service';

describe('SearchGiphyService', () => {
  let service: SearchGiphyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchGiphyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
