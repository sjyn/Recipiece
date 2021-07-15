import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSortItemsComponent } from './recipe-sort-items.component';

describe('RecipeViewComponent', () => {
  let component: RecipeSortItemsComponent;
  let fixture: ComponentFixture<RecipeSortItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeSortItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSortItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
