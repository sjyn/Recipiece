import { TestBed } from '@angular/core/testing';

import { IndexedDbWrapperService } from './indexed-db-wrapper.service';

describe('HttpIndexeddbProxyService', () => {
  let service: IndexedDbWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedDbWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
