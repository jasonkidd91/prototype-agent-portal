import { Component, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';

@Component({
  selector: 'app-credit-history',
  templateUrl: './credit-history.component.html',
  styleUrls: ['./credit-history.component.css']
})
export class CreditHistoryComponent implements OnInit {

  dummy$ = [
    { t_type: 'credit', amount: 11, note: 'Top up 11 Credits', dt: '2019-07-29T16:24:30+08:00' },
    { t_type: 'credit', amount: 4, note: 'Returned 4 credits of deposit from Closing Loan Case [LP-1101]', dt: '2019-07-29T13:15:30+08:00' },
    { t_type: 'debit', amount: 5, note: 'Pay 1 + 4 credits from applying Loan Case [LP-1101]', dt: '2019-07-29T12:47:30+08:00' },
    { t_type: 'credit', amount: 11, note: 'Top up 11 Credits', dt: '2019-07-28T16:24:30+08:00' },
    { t_type: 'credit', amount: 4, note: 'Returned 4 credits of deposit from Closing Loan Case [LP-1101]', dt: '2019-07-28T13:15:30+08:00' },
    { t_type: 'debit', amount: 5, note: 'Pay 1 + 4 credits from applying Loan Case [LP-1101]', dt: '2019-07-28T12:47:30+08:00' },
    { t_type: 'credit', amount: 10, note: 'New joiner free gift 10 credits', dt: '2019-07-25T14:54:30+08:00' }
  ];
  public data$: Array<any> = [];
  public isLoading = false;

  constructor(private cs: ComponentService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.cs.showLoading();
    this.isLoading = true;
    setTimeout(() => {
      Promise.resolve().then(() => {
        const groups = this.dummy$.reduce((groups, data) => {
          const date = data.dt.split('T')[0];
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(data);
          return groups;
        }, {});
        // console.log(`groups`)
        // console.log(groups)
        const groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            data: groups[date]
          };
        });
        // console.log(`groupArrays`);
        // console.log(groupArrays)
        if (groupArrays) {
          this.data$.push(...groupArrays);
        }
      }).then(() => {
        this.cs.hideLoading();
        this.isLoading = false;
      }).catch(err => {
        console.log(err);
        this.cs.toastError(err);
      });
    }, 1000);
  }

}
