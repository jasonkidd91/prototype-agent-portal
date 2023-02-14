import { Component, OnInit, Input } from '@angular/core';
import { Loan } from 'src/app/models/loan';
import { TranslateService } from '@ngx-translate/core';
import { People } from 'src/app/models/people';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {
  @Input() loan: Loan;

  constructor (
    private ts: TranslateService
  ) { }

  ngOnInit() {
  }

  get durationString() {
    let str = '';
    if (this.loan.duration) {
      let year = this.loan.duration.year ? this.loan.duration.year : 0;
      let month = this.loan.duration.month ? this.loan.duration.month : 0;
      year += Math.floor(month / 12);
      month = month % 12;
      if (year > 0) {
        str = str.concat(year.toString(), this.ts.instant('form.label.year'));
      }
      if (month > 0) {
        str = str.concat(month.toString(), this.ts.instant('form.label.month'));
      }
    }

    return str;
  }
}