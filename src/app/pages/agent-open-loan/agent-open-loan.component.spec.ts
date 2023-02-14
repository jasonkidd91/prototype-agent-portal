import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOpenLoanComponent } from './agent-open-loan.component';

describe('AgentOpenLoanComponent', () => {
  let component: AgentOpenLoanComponent;
  let fixture: ComponentFixture<AgentOpenLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentOpenLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentOpenLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
