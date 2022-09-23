import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComplexComponent } from './edit-complex.component';

describe('EditComplexComponent', () => {
  let component: EditComplexComponent;
  let fixture: ComponentFixture<EditComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComplexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
