import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankOfferDetailsComponent } from './bank-offer-details.component';

describe('BankOfferDetailsComponent', () => {
  let component: BankOfferDetailsComponent;
  let fixture: ComponentFixture<BankOfferDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankOfferDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankOfferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
