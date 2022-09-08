import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationAllocationComponent } from './designation-allocation.component';

describe('DesignationAllocationComponent', () => {
  let component: DesignationAllocationComponent;
  let fixture: ComponentFixture<DesignationAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
