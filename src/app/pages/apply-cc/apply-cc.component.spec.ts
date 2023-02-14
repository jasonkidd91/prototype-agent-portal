import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCcComponent } from './apply-cc.component';

describe('ApplyCcComponent', () => {
  let component: ApplyCcComponent;
  let fixture: ComponentFixture<ApplyCcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
