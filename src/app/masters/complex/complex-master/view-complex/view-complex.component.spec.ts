import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComplexComponent } from './view-complex.component';

describe('ViewComplexComponent', () => {
  let component: ViewComplexComponent;
  let fixture: ComponentFixture<ViewComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewComplexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
