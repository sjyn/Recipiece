import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecipeBookModalComponent } from './delete-recipe-book-modal.component';

describe('DeleteRecipeBookModalComponent', () => {
  let component: DeleteRecipeBookModalComponent;
  let fixture: ComponentFixture<DeleteRecipeBookModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRecipeBookModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecipeBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
