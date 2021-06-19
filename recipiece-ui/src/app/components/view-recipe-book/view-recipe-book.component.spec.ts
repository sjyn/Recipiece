import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewRecipeBookComponent } from './view-recipe-book.component';

describe('ViewRecipeBookComponent', () => {
  let component: ViewRecipeBookComponent;
  let fixture: ComponentFixture<ViewRecipeBookComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRecipeBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecipeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
