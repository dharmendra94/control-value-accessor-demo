import { TestBed } from '@angular/core/testing';

import { NetflixSearchService } from './netflix-search.service';

describe('NetflixSearchService', () => {
  let service: NetflixSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetflixSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
