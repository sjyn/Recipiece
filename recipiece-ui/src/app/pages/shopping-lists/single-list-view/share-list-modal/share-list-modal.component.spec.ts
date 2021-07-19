import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareListModalComponent } from './share-list-modal.component';

describe('ShareListModalComponent', () => {
  let component: ShareListModalComponent;
  let fixture: ComponentFixture<ShareListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
