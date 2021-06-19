import { TestBed } from '@angular/core/testing';

import { LinkRecipeService } from './link-recipe.service';

describe('LinkRecipeService', () => {
  let service: LinkRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
