import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkRecipeModalComponent } from './link-recipe-modal.component';

describe('LinkRecipeModalComponent', () => {
  let component: LinkRecipeModalComponent;
  let fixture: ComponentFixture<LinkRecipeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkRecipeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkRecipeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
