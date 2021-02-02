import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRecipeIngredientsComponent } from './config-recipe-ingredients.component';

describe('ConfigRecipeIngredientsComponent', () => {
  let component: ConfigRecipeIngredientsComponent;
  let fixture: ComponentFixture<ConfigRecipeIngredientsComponent>;

  beforeEach(async(() => {
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
