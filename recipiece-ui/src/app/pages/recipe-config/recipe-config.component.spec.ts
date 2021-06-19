import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeConfigComponent } from './recipe-config.component';

describe('RecipeConfigComponent', () => {
  let component: RecipeConfigComponent;
  let fixture: ComponentFixture<RecipeConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
