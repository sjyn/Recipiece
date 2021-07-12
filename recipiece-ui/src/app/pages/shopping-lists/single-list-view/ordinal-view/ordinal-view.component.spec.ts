import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinalViewComponent } from './ordinal-view.component';

describe('OrdinalViewComponent', () => {
  let component: OrdinalViewComponent;
  let fixture: ComponentFixture<OrdinalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdinalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
