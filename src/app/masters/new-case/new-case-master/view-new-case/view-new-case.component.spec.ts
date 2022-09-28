import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewCaseComponent } from './view-new-case.component';

describe('ViewNewCaseComponent', () => {
  let component: ViewNewCaseComponent;
  let fixture: ComponentFixture<ViewNewCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNewCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
