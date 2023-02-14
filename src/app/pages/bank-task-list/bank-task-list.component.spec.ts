import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTaskListComponent } from './bank-task-list.component';

describe('BankTaskListComponent', () => {
  let component: BankTaskListComponent;
  let fixture: ComponentFixture<BankTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
