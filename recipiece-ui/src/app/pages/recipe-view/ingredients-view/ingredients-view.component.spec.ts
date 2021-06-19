import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngredientsViewComponent } from './ingredients-view.component';

describe('IngredientsViewComponent', () => {
  let component: IngredientsViewComponent;
  let fixture: ComponentFixture<IngredientsViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
