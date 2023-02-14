import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCloseLoanComponent } from './agent-close-loan.component';

describe('AgentCloseLoanComponent', () => {
  let component: AgentCloseLoanComponent;
  let fixture: ComponentFixture<AgentCloseLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentCloseLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentCloseLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
