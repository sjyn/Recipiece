import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigRecipeBasicsComponent } from './config-recipe-basics.component';

describe('ConfigRecipeBasicsComponent', () => {
  let component: ConfigRecipeBasicsComponent;
  let fixture: ComponentFixture<ConfigRecipeBasicsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigRecipeBasicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigRecipeBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
