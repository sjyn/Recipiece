import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipeBookModalComponent } from './create-recipe-book-modal.component';

describe('CreateRecipeBookModalComponent', () => {
  let component: CreateRecipeBookModalComponent;
  let fixture: ComponentFixture<CreateRecipeBookModalComponent>;

  beforeEach(async(() => {
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
