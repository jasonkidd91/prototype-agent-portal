import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ComponentService } from 'src/app/services/component.service';

@Component({
  selector: 'app-bank-offer-details',
  templateUrl: './bank-offer-details.component.html',
  styleUrls: ['./bank-offer-details.component.css']
})
export class BankOfferDetailsComponent implements OnInit {

  dummy$ = {
    id: 'CL1100',
    bank_name: 'Bank A',
    loan_type: 'Car Loan',
    rate: 3.5,
    installment: 2137.53,
    notes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    status: 'RESPONDED',
    pre: { amount: 100000, term: 9 },
    post: { amount: 80000, term: 7 }
  };
  public offer: any;
  public readOnly: boolean = true;

  constructor(private dialogRef: MatDialogRef<BankOfferDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cs: ComponentService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.cs.showLoading();
    setTimeout(() => {
      let dummy = this.dummy$;
      dummy.bank_name = this.data.name;
      this.readOnly = this.data.status == 'RESPONDED' ? false : true;
      this.offer = dummy;
      this.cs.hideLoading();
    }, 1000);
  }

  acceptOffer() {
    this.cs.confirm({
      title: 'Accept Offer?',
      message: 'Do you really want to accept this offer?'
    }).subscribe(res => {
      if (res) {
        this.dialogRef.close('A');
      }
    });
  }

  declineOffer() {
    this.cs.confirm({
      title: 'Decline Offer?',
      message: 'Do you really want to decline this offer?'
    }).subscribe(res => {
      if (res) {
        this.dialogRef.close('R');
      }
    });
  }

}
