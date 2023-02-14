import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ComponentService } from 'src/app/services/component.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ApplicationDetailsComponent } from '../application-details/application-details.component';
import { BankOfferDetailsComponent } from '../bank-offer-details/bank-offer-details.component';
import { AgentSummaryComponent } from '../agent-summary/agent-summary.component';

@Component({
  selector: 'app-user-application',
  templateUrl: './user-application.component.html',
  styleUrls: ['./user-application.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserApplicationComponent implements OnInit, OnDestroy {

  /* Agent Application Status
  DRAFT: Private (Not Using Currently)
  NEW: Pending Agent to Take Over Case
  PROCESSING: Assigned to Agent and In Progress
  APPROVED: Application Successfully Processed
  REJECTED: Application has been Rejected
  CLOSED: Closed Application
  */
  agentDummy$ = [
    {
      id: 'CL1100', dt: '2019-07-29T16:10:30+08:00', loan_type: 'Car Loan', amount: 100000, term: 9, status: 'NEW', agent: null, notes: '',
      logs: [
        { dt: '2019-07-30T16:14:30+08:00', message: 'Open Application' },
        { dt: '2019-07-31T16:15:30+08:00', message: 'Agent Jason requested to take over this application' },
        { dt: '2019-08-01T16:16:30+08:00', message: 'Agent Peter requested to take over this application' },
        { dt: '2019-08-02T16:17:30+08:00', message: 'Agent Agnes requested to take over this application' }
      ],
      request: [
        { dt: '2019-07-31T16:14:30+08:00', total_case: null, overall_rating: null, agent: { name: 'Jason', case: [{ type: 'Car Loan', count: 50, rating: 3.5 }, { type: 'House Loan', count: 50, rating: 4 }, { type: 'Personal Loan', count: 20, rating: 3 }, { type: 'Business Loan', count: 12, rating: 3.5 }] } },
        { dt: '2019-08-01T16:14:30+08:00', total_case: null, overall_rating: null, agent: { name: 'Peter', case: [{ type: 'Car Loan', count: 12, rating: 3.5 }, { type: 'House Loan', count: 0, rating: null }, { type: 'Personal Loan', count: 55, rating: 2.9 }, { type: 'Business Loan', count: 25, rating: 4.5 }] } },
        { dt: '2019-08-02T16:14:30+08:00', total_case: null, overall_rating: null, agent: { name: 'Agnes', case: [{ type: 'Car Loan', count: 30, rating: 3.5 }, { type: 'House Loan', count: 27, rating: 4.7 }, { type: 'Personal Loan', count: 0, rating: null }, { type: 'Business Loan', count: 38, rating: 3.8 }] } },
        { dt: '2019-08-03T16:14:30+08:00', total_case: null, overall_rating: null, agent: { name: 'Tommy', case: [{ type: 'Car Loan', count: 0, rating: 0 }, { type: 'House Loan', count: 0, rating: 0 }, { type: 'Personal Loan', count: 0, rating: null }, { type: 'Business Loan', count: 0, rating: null }] } }
      ]
    },
    {
      id: 'HL1101', dt: '2019-07-29T10:14:30+08:00', loan_type: 'House Loan', amount: 5000000, term: 50, status: 'PROCESSING', agent: { name: 'Jason', case: [{ type: 'Car Loan', count: 50, rating: 3.5 }, { type: 'House Loan', count: 50, rating: 4 }, { type: 'Personal Loan', count: 20, rating: 3 }, { type: 'Business Loan', count: 12, rating: 3.5 }] }, notes: '',
      logs: [
        { dt: '2019-07-29T16:14:30+08:00', message: 'Open Application' },
        { dt: '2019-07-29T16:16:30+08:00', message: 'Agent Jason requested to take over this application' },
        { dt: '2019-07-29T16:17:30+08:00', message: 'Agent Jason has been Accepted' }
      ],
      request: null
    },
    {
      id: 'BL1102', dt: '2019-07-29T12:14:30+08:00', loan_type: 'Business Loan', amount: 300000, term: 9, status: 'APPROVED', agent: { name: 'Peter', case: [{ type: 'Car Loan', count: 12, rating: 3.5 }, { type: 'House Loan', count: 0, rating: null }, { type: 'Personal Loan', count: 55, rating: 2.9 }, { type: 'Business Loan', count: 25, rating: 4.5 }] }, notes: '',
      logs: [
        { dt: '2019-07-29T16:14:30+08:00', message: 'Open Application' },
        { dt: '2019-07-29T16:16:30+08:00', message: 'Agent Peter requested to take over this application' },
        { dt: '2019-07-29T16:18:30+08:00', message: 'Agent Peter has been Accepted' },
        { dt: '2019-07-29T16:20:30+08:00', message: 'Application has been successfully processed.' }
      ],
      request: null
    },
    {
      id: 'PL1103', dt: '2019-07-29T10:14:30+08:00', loan_type: 'Personal Loan', amount: 20000, term: 2, status: 'REJECTED', reason: 'Another Loan Application is currently under processing.', agent: { name: 'Agnes', case: [{ type: 'Car Loan', count: 30, rating: 3.5 }, { type: 'House Loan', count: 27, rating: 4.7 }, { type: 'Personal Loan', count: 0, rating: null }, { type: 'Business Loan', count: 38, rating: 3.8 }] }, notes: '',
      logs: [
        { dt: '2019-07-29T16:12:30+08:00', message: 'Open Application' },
        { dt: '2019-07-29T16:14:30+08:00', message: 'Agent Agnes requested to take over this application' },
        { dt: '2019-07-29T16:16:30+08:00', message: 'Agent Agnes has been Accepted' },
        { dt: '2019-07-29T16:18:30+08:00', message: 'Application Rejeted, Reson: "Another Loan Application is currently under processing."' }
      ],
      request: null
    }
  ];

  /* Bank Application Status
  DRAFT: Private (Not Using Currently)
  REVIEWING: Sent to Bank and Reviewing
  PARTIAL_RESPONDED: Bank Responded with Optimal Offers/Rejected, Wating User Decision
  FULL_RESPONDED: Bank Responded with Optimal Offers/Rejected, Wating User Decision
  PROCESSING: Offer Accepted By User and Bank Start to Process
  CLOSED: [
    1. All Banks Reject Application
    or
    2. User Reject All Offers
    or
    3. Accepted Offer's Bank Successfully Processed the Application
  ]
  */
  bankDummy$ = [
    {
      id: 'CL1100', dt: '2019-07-29T16:10:30+08:00', loan_type: 'Car Loan', amount: 100000, term: 9, status: 'REVIEWING', notes: '',
      logs: [
        { dt: '2019-07-30T16:14:30+08:00', message: 'Open Application' }
      ],
      banks: [
        { name: 'Bank A', status: 'PENDING', offered: false },
        { name: 'Bank B', status: 'PENDING', offered: false },
        { name: 'Bank C', status: 'PENDING', offered: false },
        { name: 'Bank D', status: 'PENDING', offered: false }
      ]
    },
    {
      id: 'HL1101', dt: '2019-07-29T10:14:30+08:00', loan_type: 'House Loan', amount: 5000000, term: 50, status: 'PARTIAL_RESPONDED', notes: '',
      logs: [
        { dt: '2019-07-29T16:14:30+08:00', message: 'Open Application' },
        { dt: '2019-07-29T16:16:30+08:00', message: 'Bank A has Responded with an Offer' },
        { dt: '2019-07-29T16:17:30+08:00', message: 'Bank C has Rejected this application' }
      ],
      banks: [
        { name: 'Bank A', status: 'RESPONDED', offered: true },
        { name: 'Bank B', status: 'PENDING', offered: false },
        { name: 'Bank C', status: 'REJECTED', offered: false, reason: 'Bad Credit Score' },
        { name: 'Bank D', status: 'PENDING', offered: false }
      ]
    },
    {
      id: 'BL1102', dt: '2019-07-29T12:14:30+08:00', loan_type: 'Business Loan', amount: 300000, term: 9, status: 'FULL_RESPONDED', notes: '',
      logs: [
        { dt: '2019-07-29T16:14:30+08:00', message: 'Open Application' },
        { dt: '2019-07-29T16:16:30+08:00', message: 'Bank A has Rejected this application' },
        { dt: '2019-07-29T16:18:30+08:00', message: 'Bank B has Rejected this application' },
        { dt: '2019-07-29T16:20:30+08:00', message: 'Bank C has Responded with an Offer' },
        { dt: '2019-07-29T16:22:30+08:00', message: 'Bank D has Responded with an Offer' }
      ],
      banks: [
        { name: 'Bank A', status: 'REJECTED', offered: false, reason: 'Bad Credit Score' },
        { name: 'Bank B', status: 'REJECTED', offered: false, reason: 'Bad Credit Score' },
        { name: 'Bank C', status: 'RESPONDED', offered: true },
        { name: 'Bank D', status: 'RESPONDED', offered: true }
      ]
    },
    {
      id: 'PL1103', dt: '2019-07-29T10:14:30+08:00', loan_type: 'Personal Loan', amount: 20000, term: 2, status: 'PROCESSING', notes: '',
      logs: [
        { dt: '2019-07-29T16:12:30+08:00', message: 'Open Application' },
        { dt: '2019-07-29T16:14:30+08:00', message: 'Bank A has Rejected this application' },
        { dt: '2019-07-29T16:16:30+08:00', message: 'Bank B has Rejected this application' },
        { dt: '2019-07-29T16:18:30+08:00', message: 'User has Accepted Bank C Offer and Declined Others' }
      ],
      banks: [
        { name: 'Bank A', status: 'REJECTED', offered: false, reason: 'Bad Credit Score' },
        { name: 'Bank B', status: 'REJECTED', offered: false, reason: 'Bad Credit Score' },
        { name: 'Bank C', status: 'ACCEPTED', offered: true },
        { name: 'Bank D', status: 'DECLINED', offered: true }
      ]
    },
    {
      id: 'PL1104', dt: '2019-07-29T10:18:30+08:00', loan_type: 'Personal Loan', amount: 80000, term: 3, status: 'CLOSED', notes: '',
      logs: [
        { dt: '2019-07-29T16:12:30+08:00', message: 'Open Application' },
        { dt: '2019-07-29T16:14:30+08:00', message: 'Bank A has Rejected this application' },
        { dt: '2019-07-29T16:16:30+08:00', message: 'Bank B has Rejected this application' },
        { dt: '2019-07-29T16:18:30+08:00', message: 'User has Declined Bank C Offer' },
        { dt: '2019-07-29T18:18:30+08:00', message: 'User has Declined Bank D Offer and Closed this application' }
      ],
      banks: [
        { name: 'Bank A', status: 'REJECTED', offered: false, reason: 'Bad Credit Score' },
        { name: 'Bank B', status: 'REJECTED', offered: false, reason: 'Bad Credit Score' },
        { name: 'Bank C', status: 'DECLINED', offered: true },
        { name: 'Bank D', status: 'DECLINED', offered: true }
      ]
    }
  ];
  public subscription: Subscription = new Subscription();
  public applicationType: string;
  public data$ = [];
  public isLoading: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cs: ComponentService) {
    const subscription = this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ).subscribe(event => {
      if (event) {
        console.log('[UserApplicationComponent]: Navigation Subscription')
        this.initialize();
      }
    });
    this.subscription.add(subscription);
  }

  ngOnInit() { }

  ngOnDestroy() {
    console.log('[UserApplicationComponent]: Destroying Subscription')
    this.subscription.unsubscribe();
  }

  initialize() {
    this.data$ = [];
    this.applicationType = this.route.snapshot.paramMap.get('type');
    const applicationType = this.applicationType;
    console.log('Application Type: ' + applicationType);
    if (applicationType) {
      // this.cs.showLoading();
      this.isLoading = true;
      setTimeout(() => {
        let data = [];
        data = this.filterDataByApplicationType();
        this.data$ = data;
        // this.cs.hideLoading();
        this.isLoading = false;
      }, 1000);
    }
  }

  filterDataByApplicationType(): any {
    const applicationType = this.applicationType;
    if (applicationType == 'agent') {
      return this.agentDummy$.map(agent => {
        if (agent.request) {
          agent.request = agent.request.map(req => {
            req.total_case = req.agent.case.map(c => c.count).reduce((sum, count) => sum + count);
            const divider = req.agent.case.filter(c => c.rating != null).length;
            req.overall_rating = req.agent.case.map(c => c.rating ? c.rating : 0).reduce((sum, rating) => sum + rating) / divider;
            return req;
          });
        }
        return agent;
      });
    } else if (applicationType == 'bank') {
      return this.bankDummy$;
    } else {
      return [];
    }
  }

  switchLoanIcon(loanType): string {
    switch (loanType) {
      case 'Car Loan': return 'directions_car';
      case 'Business Loan': return 'business_center';
      case 'House Loan': return 'home';
      case 'Personal Loan': return 'account_box';
      default: return 'library_books';
    }
  }

  viewDetails(data) {
    this.cs.openModal(ApplicationDetailsComponent);
  }

  agentDetails(data) {
    this.cs.openModal(AgentSummaryComponent, {
      data: data
    });
  }

  assignAgent(data) {
    const agent = data.choosen;
    this.cs.confirm({
      title: 'Confirm Agent?',
      message: `Assign ${agent.name} to handle this application`
    }).subscribe(res => {
      if (res) {
        this.cs.showLoading();
        setTimeout(() => {
          data.agent = agent;
          data.status = 'PROCESSING';
          this.cs.hideLoading();
        }, 1000);
      }
    });
  }

  repostApplication(data) {
    this.cs.confirm({
      title: 'Repost Application?',
      message: `Repost Application ${data.id}?`
    }).subscribe(res => {
      if (res) {
        this.cs.showLoading();
        setTimeout(() => {
          const date = new Date();
          let newData = JSON.parse(JSON.stringify(data));
          newData.dt = date;
          newData.id = newData.id + '_2';
          newData.agent = null;
          newData.status = 'NEW';
          this.data$.push(newData);
          data.repost = true;
          data.logs.push({ dt: date, message: 'Repost Application' });
          this.cs.hideLoading();
        }, 1000);
      }
    });
  }

  discardApplication(data) {
    this.cs.confirm({
      title: 'Discard Application',
      message: 'Discard this application?'
    }).subscribe(res => {
      if (res) {
        this.cs.showLoading();
        setTimeout(() => {
          data.status = 'DISCARDED';
          data.logs.push({ dt: '2019-07-31T16:14:30+08:00', message: 'User Discarded Application' });
          this.cs.hideLoading();
        }, 1000);
      }
    });
  }

  // reopenApplication(data) {
  //   this.cs.confirm({
  //     title: 'Reopen Application?',
  //     message: `Reopen Application ${data.id}?`
  //   }).subscribe(res => {
  //     if (res) {
  //       this.cs.showLoading();
  //       setTimeout(() => {
  //         data.status = 'NEW';
  //         data.logs.push({ dt: '2019-08-01T16:14:30+08:00', message: 'User Reopened Application' })
  //         this.cs.hideLoading();
  //       }, 1000);
  //     }
  //   });
  // }

  offerDetails(data, bank) {
    const dialogRef = this.cs.openModal(BankOfferDetailsComponent, {
      data: {
        ...bank
      }
    });
    if (bank.status == 'RESPONDED') {
      dialogRef.subscribe(dialog => {
        if (dialog) {
          dialog.afterClosed().subscribe((res) => {
            if (res == 'A') {
              bank.status = 'ACCEPTED';
              data.status = 'PROCESSING';
              data.banks.forEach(b => {
                if (b.status == 'RESPONDED') {
                  b.status = 'DECLINED';
                }
              });
              data.logs.push({ dt: '2019-07-29T16:14:30+08:00', message: 'User Accept Bank A Offer and Declined Others' });
            } else if (res == 'R') {
              bank.status = 'DECLINED';
              const filter = data.banks.find(b => { return b.status == 'RESPONDED' });
              if (!filter) {
                data.status = 'CLOSED';
                data.logs.push({ dt: '2019-07-29T16:14:30+08:00', message: 'User Declined Bank A Offer and Closed Application' });
              } else {
                data.logs.push({ dt: '2019-07-29T16:14:30+08:00', message: 'User Declined Bank A Offer' });
              }
            }
          });
        }
      });
    }
  }

}
