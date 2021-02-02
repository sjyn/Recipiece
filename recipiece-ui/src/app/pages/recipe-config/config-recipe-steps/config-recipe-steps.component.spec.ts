import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRecipeStepsComponent } from './config-recipe-steps.component';

describe('ConfigRecipeStepsComponent', () => {
  let component: ConfigRecipeStepsComponent;
  let fixture: ComponentFixture<ConfigRecipeStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigRecipeStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigRecipeStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
