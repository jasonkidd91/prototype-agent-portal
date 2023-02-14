import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankNotificationsComponent } from './bank-notifications.component';

describe('BankNotificationsComponent', () => {
  let component: BankNotificationsComponent;
  let fixture: ComponentFixture<BankNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
