import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinUsAgentComponent } from './join-us-agent.component';

describe('JoinUsAgentComponent', () => {
  let component: JoinUsAgentComponent;
  let fixture: ComponentFixture<JoinUsAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinUsAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinUsAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
