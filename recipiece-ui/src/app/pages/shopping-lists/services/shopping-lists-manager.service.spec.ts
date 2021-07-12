import { TestBed } from '@angular/core/testing';

import { ShoppingListsManagerService } from './shopping-lists-manager.service';

describe('ShoppingListsManagerService', () => {
  let service: ShoppingListsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
