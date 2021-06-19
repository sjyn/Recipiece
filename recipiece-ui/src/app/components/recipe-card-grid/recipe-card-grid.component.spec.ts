import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeCardGridComponent } from './recipe-card-grid.component';

describe('RecipeCardGridComponent', () => {
  let component: RecipeCardGridComponent;
  let fixture: ComponentFixture<RecipeCardGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCardGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
