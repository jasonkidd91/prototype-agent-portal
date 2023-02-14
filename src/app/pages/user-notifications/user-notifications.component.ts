import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserNotificationsComponent implements OnInit {

  dummy$ = [
    { dt: '2019-07-29T16:14:30+08:00', title: '[#LP-1101]: Jason has requested to take over your application', view: false, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt rem odit quis quaerat.' },
    { dt: '2019-07-28T10:54:30+08:00', title: '[#LP-1101]: Andy has requested to take over your application', view: false, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt rem odit quis quaerat.' },
    { dt: '2019-07-27T09:22:30+08:00', title: '[#LP-1101]: Peter has requested to take over your application', view: true, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt rem odit quis quaerat.' },
    { dt: '2019-07-26T12:39:30+08:00', title: '[System Message!!]: Agent Portal is now on App Store!', view: true, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt rem odit quis quaerat.' },
    { dt: '2019-07-25T15:14:30+08:00', title: '[#LP-1100]: Bank A has closed your application', view: true, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt rem odit quis quaerat.' },
    { dt: '2019-07-24T14:07:30+08:00', title: '[#LP-1100]: Bank A has responsed to your application', view: true, message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt rem odit quis quaerat.' }
  ];
  public data$ = [];
  public isLoading: boolean = false;
  public date$ = new Date();

  constructor(private cs: ComponentService) { }

  ngOnInit() {
    // this.loadData();
  }

  loadData() {
    this.data$ = [];
    this.cs.showLoading();
    this.isLoading = true;
    setTimeout(() => {
      const data = this.dummy$;
      this.data$.push(...data);
      this.cs.hideLoading();
      this.isLoading = false;
    }, 1000);
  }

  viewMessage(data) {
    if (!data.view) {
      //Mark as read
      data.view = true;
    }
  }

  deleteMessage(data) {
    this.cs.confirm({
      title: 'Delete Message',
      message: 'Do you sure you want to delete this message?'
    }).subscribe(res => {
      if (res) {
        this.cs.showLoading();
        setTimeout(() => {
          const index = this.data$.indexOf(data);

          if (index >= 0) {
            this.data$.splice(index, 1);
          }
          this.cs.hideLoading();
        }, 1000);
      }
    })
  }

}
