import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleListViewComponent } from './single-list-view.component';

describe('SingleListViewComponent', () => {
  let component: SingleListViewComponent;
  let fixture: ComponentFixture<SingleListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
