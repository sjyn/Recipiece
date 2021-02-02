import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDrawerComponent } from './dashboard-drawer.component';

describe('DashboardDrawerComponent', () => {
  let component: DashboardDrawerComponent;
  let fixture: ComponentFixture<DashboardDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
