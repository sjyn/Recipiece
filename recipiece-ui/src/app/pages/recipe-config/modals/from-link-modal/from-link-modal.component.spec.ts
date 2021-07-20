import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromLinkModalComponent } from './from-link-modal.component';

describe('FromLinkModalComponent', () => {
  let component: FromLinkModalComponent;
  let fixture: ComponentFixture<FromLinkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromLinkModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
