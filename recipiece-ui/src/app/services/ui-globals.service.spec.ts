import { TestBed } from '@angular/core/testing';

import { UiGlobalsService } from './ui-globals.service';

describe('UiGlobalsService', () => {
  let service: UiGlobalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiGlobalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
