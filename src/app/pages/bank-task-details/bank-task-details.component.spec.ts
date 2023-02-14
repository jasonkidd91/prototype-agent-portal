import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTaskDetailsComponent } from './bank-task-details.component';

describe('BankTaskDetailsComponent', () => {
  let component: BankTaskDetailsComponent;
  let fixture: ComponentFixture<BankTaskDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankTaskDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
