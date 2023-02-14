import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ComponentService } from 'src/app/services/component.service';
import { PackageDetailsComponent } from '../package-details/package-details.component';

@Component({
  selector: 'app-bank-task-details',
  templateUrl: './bank-task-details.component.html',
  styleUrls: ['./bank-task-details.component.css']
})
export class BankTaskDetailsComponent implements OnInit {

  dummy$ = {
    dt: '2019-07-29T16:14:30+08:00',
    id: 'CL-1101',
    loan_type: 'Car Loan',
    amount: 600000,
    term: 9,
    status: 'Pending Review',
    package: null,
    name: 'Beh Wei Chuan',
  };
  public task;
  public offerState: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cs: ComponentService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.cs.showLoading();
    setTimeout(() => {
      let task = this.dummy$;
      if (this.data) {
        task.dt = this.data.dt;
        task.id = this.data.id;
        task.loan_type = this.data.type;
        task.name = this.data.user;
        task.status = this.data.status;
        task.package = this.data.package;
      }
      this.task = task.package ? {
        ...task,
        rate: 3.17,
        installment: 512.89
      } : task;
      this.cs.hideLoading();
    }, 1000);
  }

  acceptTask() {
    this.cs.confirm({
      title: this.task.package ? 'Approve Task' : 'Respond Offer',
      message: this.task.package ? 'Do you really want to approve this application?'
        : 'Do you really want to accept this application with provided offer?'
    }).subscribe(res => {
      if (res) {
        this.cs.showLoading();
        setTimeout(() => {
          {
            //if without package
            //Set Loan Amount from Input
            //Set Loan Term from Input
            //Set Interest Rate from Input
          }
          this.task.status = this.task.package ? 'In Progress' : 'Waiting Reply';
          this.offerState = false;
          this.cs.hideLoading();
        }, 1000);
      }
    })
  }

  rejectTask() {
    this.cs.promptInput({
      title: 'Reject Reason',
    }).subscribe((data) => {
      if (data && data.trim() != '') {
        this.cs.showLoading();
        setTimeout(() => {
          this.task.reason = data;
          this.task.status = 'Rejected';
          this.cs.hideLoading();
        }, 1000);
      } else if (data != undefined) {
        this.cs.toastError('Reject Reason is Required.')
      }
    });
  }

  completeTask() {
    this.cs.confirm({
      title: 'Complete Task',
      message: 'Do you really want to mark this application as Completed?'
    }).subscribe(res => {
      if (res) {
        this.cs.showLoading();
        setTimeout(() => {
          this.task.status = 'Completed';
          this.cs.hideLoading();
        }, 1000);
      }
    });
  }

  packageDetails() {
    this.cs.openModal(PackageDetailsComponent)
  }

  switchStatusClass(status): string {
    if (status == 'Pending Review') { return 'text-warn'; }
    else if (status == 'Waiting Reply') { return 'text-accent'; }
    else if (status == 'In Progress') { return 'text-warn'; }
    else if (status == 'Completed') { return 'text-primary'; }
    else if (status == 'Rejected') { return 'text-primary'; }
    else { return ''; }
  }

}
