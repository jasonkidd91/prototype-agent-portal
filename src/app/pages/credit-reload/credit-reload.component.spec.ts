import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditReloadComponent } from './credit-reload.component';

describe('CreditReloadComponent', () => {
  let component: CreditReloadComponent;
  let fixture: ComponentFixture<CreditReloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditReloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditReloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
