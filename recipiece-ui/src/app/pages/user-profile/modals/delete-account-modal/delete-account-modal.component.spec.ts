import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteAccountModalComponent } from './delete-account-modal.component';

describe('DeleteAccountModalComponent', () => {
  let component: DeleteAccountModalComponent;
  let fixture: ComponentFixture<DeleteAccountModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAccountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
