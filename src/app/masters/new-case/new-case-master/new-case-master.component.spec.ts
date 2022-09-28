import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaseMasterComponent } from './new-case-master.component';

describe('NewCaseMasterComponent', () => {
  let component: NewCaseMasterComponent;
  let fixture: ComponentFixture<NewCaseMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaseMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaseMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
