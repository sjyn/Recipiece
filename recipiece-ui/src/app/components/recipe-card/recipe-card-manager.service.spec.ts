import { TestBed } from '@angular/core/testing';

import { RecipeCardManagerService } from './recipe-card-manager.service';

describe('RecipeCardManagerService', () => {
  let service: RecipeCardManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeCardManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
