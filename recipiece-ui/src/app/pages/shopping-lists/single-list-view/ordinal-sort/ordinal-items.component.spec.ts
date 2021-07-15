import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdinalItemsComponent } from './ordinal-items.component';

describe('OrdinalViewComponent', () => {
  let component: OrdinalItemsComponent;
  let fixture: ComponentFixture<OrdinalItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdinalItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinalItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
