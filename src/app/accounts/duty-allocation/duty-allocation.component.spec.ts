import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyAllocationComponent } from './duty-allocation.component';

describe('DutyAllocationComponent', () => {
  let component: DutyAllocationComponent;
  let fixture: ComponentFixture<DutyAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DutyAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
