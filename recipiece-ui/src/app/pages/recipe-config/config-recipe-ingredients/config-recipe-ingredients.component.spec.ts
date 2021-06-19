import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigRecipeIngredientsComponent } from './config-recipe-ingredients.component';

describe('ConfigRecipeIngredientsComponent', () => {
  let component: ConfigRecipeIngredientsComponent;
  let fixture: ComponentFixture<ConfigRecipeIngredientsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigRecipeIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigRecipeIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
