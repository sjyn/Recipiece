import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRecipeEquipmentComponent } from './config-recipe-equipment.component';

describe('ConfigRecipeEquipmentComponent', () => {
  let component: ConfigRecipeEquipmentComponent;
  let fixture: ComponentFixture<ConfigRecipeEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigRecipeEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigRecipeEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
