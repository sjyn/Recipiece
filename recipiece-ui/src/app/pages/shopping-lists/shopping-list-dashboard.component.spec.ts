import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListDashboardComponent } from './shopping-list-dashboard.component';

describe('ShoppingListDashboardComponent', () => {
  let component: ShoppingListDashboardComponent;
  let fixture: ComponentFixture<ShoppingListDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
