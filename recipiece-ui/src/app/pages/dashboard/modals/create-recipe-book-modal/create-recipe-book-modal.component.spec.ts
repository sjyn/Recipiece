import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateRecipeBookModalComponent } from './create-recipe-book-modal.component';

describe('CreateRecipeBookModalComponent', () => {
  let component: CreateRecipeBookModalComponent;
  let fixture: ComponentFixture<CreateRecipeBookModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRecipeBookModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecipeBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
