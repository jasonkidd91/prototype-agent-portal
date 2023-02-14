import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSignInComponent } from './agent-sign-in.component';

describe('AgentSignInComponent', () => {
  let component: AgentSignInComponent;
  let fixture: ComponentFixture<AgentSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
