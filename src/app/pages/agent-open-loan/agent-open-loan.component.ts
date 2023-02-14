import { Component, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';
import { ApplicationDetailsComponent } from '../application-details/application-details.component';

@Component({
  selector: 'app-agent-open-loan',
  templateUrl: './agent-open-loan.component.html',
  styleUrls: ['./agent-open-loan.component.css']
})
export class AgentOpenLoanComponent implements OnInit {

  dummy$ = [
    {
      dt_request: '2019/03/15 01:00 PM',
      dt_match: '2019/03/16 03:15 PM',
      dt_reopen: '2019/03/10 05:15 PM',
      dt_close: '2019/03/25 06:15 PM',
      status: 'IN PROGRESS',
      reason: '',
      remarks: '',
      id: 'CL1101',
      type: 'Car Loan',
      amount: 1000000,
      period: 9,
      name: 'Beh Wei Chuan',
      gender: 'M',
      contact: '012-3456789',
      annual_income: 600000,
      business_type: 'Self-Employed',
      company_name: 'Company Name',
      occupation: 'Software Engineer',
      unclear_loan: false,
      support_docs: [{ fileName: 'payslip-2019.pdf' }, { fileName: 'employment-letter.pdf' }, { fileName: 'bank-statement.pdf' }],
      isApplied: false,
    },
    {
      dt_request: '2019/03/15 01:00 PM',
      dt_match: '2019/03/16 03:15 PM',
      dt_reopen: '2019/03/10 05:15 PM',
      dt_close: '2019/03/25 06:15 PM',
      status: 'IN PROGRESS',
      reason: '',
      remarks: '',
      id: 'PL1102',
      type: 'Personal Loan',
      amount: 2000000,
      period: 12,
      name: 'Tan Khai Ching',
      gender: 'F',
      contact: '012-3456789',
      annual_income: 600000,
      business_type: 'Employee',
      company_name: 'Company Name',
      occupation: 'Software Engineer',
      unclear_loan: true,
      support_docs: [{ fileName: 'payslip-2020.pdf' }, { fileName: 'offer-letter.pdf' }, { fileName: 'bank-statement.pdf' }],
      isApplied: false,
    },
    {
      dt_request: '2019/03/15 01:00 PM',
      dt_match: '2019/03/16 03:15 PM',
      dt_reopen: null,
      dt_close: '2019/03/25 06:15 PM',
      status: 'IN PROGRESS',
      reason: 'Too many failed attempts.',
      remarks: '',
      id: 'HL1103',
      type: 'Housing Loan',
      amount: 3000000,
      period: 15,
      name: 'Tan Jia Sing',
      gender: 'M',
      contact: '012-3456789',
      annual_income: 600000,
      business_type: 'Self-Employed',
      company_name: 'Company Name',
      occupation: 'Software Engineer',
      unclear_loan: true,
      support_docs: null,
      isApplied: true,
    }
  ];
  public data$: Array<any> = [];
  public isLoading = false;

  constructor(private cs: ComponentService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // this.cs.showLoading();
    this.isLoading = true;
    setTimeout(() => {
      const data = this.dummy$;
      if (data) {
        this.data$.push(...data);
      }
      // this.cs.hideLoading();
      this.isLoading = false;
    }, 1000);
  }

  viewDetails(): void {
    this.cs.openModal(ApplicationDetailsComponent);
  }

}
