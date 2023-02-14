import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';

@Component({
  selector: 'app-agent-loan-list',
  templateUrl: './agent-loan-list.component.html',
  styleUrls: ['./agent-loan-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AgentLoanListComponent implements OnInit {

  dummy$ = [
    {
      dt_request: '2019/03/15 01:00 PM',
      dt_match: '2019/03/16 03:15 PM',
      dt_reopen: '2019/03/10 05:15 PM',
      dt_close: '2019/03/25 06:15 PM',
      status: 'PENDING',
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
      status: 'APPROVED',
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
      status: 'REJECTED',
      reason: 'Too many failed attempts.',
      remarks: '',
      id: 'HL1103',
      type: 'House Loan',
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

  public loanType$ = [
    { code: 'CL', name: 'Car Loan', translation: 'Car Loan' },
    { code: 'HL', name: 'House Loan', translation: 'House Loan' },
    { code: 'PL', name: 'Personal Loan', translation: 'Personal Loan' },
    { code: 'BL', name: 'Business Loan', translation: 'Business Loan' },
  ];

  public prevSelectedType = [];
  public selectedType = [];
  public data$: Array<any> = [];
  public page: number;
  public search: string;
  public searchBy: string;
  public isLoading = false;

  constructor(private cs: ComponentService) { }

  ngOnInit() {
    this.selectedType = [...this.loanType$];
    this.reinitialize();
    this.loadData();
  }

  reinitialize() {
    this.page = 1;
    this.search = '';
    this.searchBy = 'id';
    this.data$ = [];
  }

  searchData() {
    this.page = 1;
    this.data$ = [];
    this.loadData();
  }

  loadData(pageNumber?) {
    const page = pageNumber ? pageNumber : 1;
    // this.cs.showLoading();
    this.isLoading = true;
    setTimeout(() => {
      let data = this.filterApplicationList(page);
      if (data) {
        data = data.filter(application => this.selectedType.find(type => type.name == application.type));  //Type Filter
        this.page = page;
        this.data$.push(...data);
      }
      console.log('current page => ', this.page);
      // this.cs.hideLoading();
      this.isLoading = false;
    }, 1000);
  }

  loadMore() {
    this.loadData(this.page + 1);
  }

  filterApplicationList(pageNumber) {
    const key = this.search;
    if (!key) {
      return this.dummy$;
    } else {
      switch (this.searchBy) {
        case 'id':
          return this.dummy$.filter(d => { return d.id.indexOf(key) >= 0; });
        case 'am':
          return this.dummy$.filter(d => { return d.amount >= Number(key); });
        case 'al':
          return this.dummy$.filter(d => { return d.amount <= Number(key); });
        case 'tm':
          return this.dummy$.filter(d => { return d.period >= Number(key); });
        case 'tl':
          return this.dummy$.filter(d => { return d.period <= Number(key); });
        default:
          return [];
      }
    }
  }

  toggleType(loanType, loanTypeSelect) {
    const index = this.selectedType.indexOf(loanType);

    if (index >= 0) {
      this.selectedType.splice(index, 1);
    } else {
      this.selectedType.push(loanType);
    }
    loanTypeSelect.writeValue(this.selectedType);
    this.searchData();
  }

  openedChangeTypeHandling(ev) {
    if (ev) { //select box opened      
      this.prevSelectedType = this.selectedType;
    } else { //select box closed, check if need to refresh data
      const prev = this.prevSelectedType.map(function (x) { return x.code; }).sort();
      const curr = this.selectedType.map(function (x) { return x.code; }).sort();
      if (prev.join(',') !== curr.join(',')) {
        this.searchData();
      }
    }
  }

  getFirstWord(str: string) {
    if (!str) {
      return '';
    }
    var words = str.split(" ");
    return words[0];
  }

}
