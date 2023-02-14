import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLoanListComponent } from './agent-loan-list.component';

describe('AgentLoanListComponent', () => {
  let component: AgentLoanListComponent;
  let fixture: ComponentFixture<AgentLoanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentLoanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentLoanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
