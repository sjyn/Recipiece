import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListsViewComponent } from './shopping-lists-view.component';

describe('ShoppingListsViewComponent', () => {
  let component: ShoppingListsViewComponent;
  let fixture: ComponentFixture<ShoppingListsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
