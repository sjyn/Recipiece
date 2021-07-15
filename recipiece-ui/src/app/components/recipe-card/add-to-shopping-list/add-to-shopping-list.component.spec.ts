import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToShoppingListComponent } from './add-to-shopping-list.component';

describe('AddToShoppingListComponent', () => {
  let component: AddToShoppingListComponent;
  let fixture: ComponentFixture<AddToShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToShoppingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
