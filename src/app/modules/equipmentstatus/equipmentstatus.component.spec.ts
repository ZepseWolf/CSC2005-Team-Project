import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentstatusComponent } from './equipmentstatus.component';

describe('EquipmentstatusComponent', () => {
  let component: EquipmentstatusComponent;
  let fixture: ComponentFixture<EquipmentstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
