import { TestBed } from '@angular/core/testing';

import { ConfigManagerService } from './config-manager.service';

describe('ConfigManagerService', () => {
  let service: ConfigManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
