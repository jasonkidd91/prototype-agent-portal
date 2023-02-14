import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { merge } from 'rxjs';
import { ComponentService } from 'src/app/services/component.service';
import { BankTaskDetailsComponent } from '../bank-task-details/bank-task-details.component';

@Component({
  selector: 'app-bank-task-list',
  templateUrl: './bank-task-list.component.html',
  styleUrls: ['./bank-task-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BankTaskListComponent implements OnInit {

  dummy$ = [
    { dt: '2019-07-29T16:14:30+08:00', id: 'CL-1101', type: 'Car Loan', user: 'Beh Wei Chuan', status: 'Pending Review', package: 'LP-1' },
    { dt: '2019-07-30T16:14:30+08:00', id: 'HL-1102', type: 'House Loan', user: 'Tan Jia Sing', status: 'Waiting Reply', package: null },
    { dt: '2019-07-31T16:14:30+08:00', id: 'BL-1103', type: 'Business Loan', user: 'Tan Khai Ching', status: 'In Progress', package: 'LP-2' },
    { dt: '2019-08-01T16:14:30+08:00', id: 'PL-1104', type: 'Personal Loan', user: 'Soh Yee Lin', status: 'Completed', package: null },
    { dt: '2019-08-02T16:14:30+08:00', id: 'CL-1105', type: 'Car Loan', user: 'Beh Wei Chuan', status: 'Rejected', package: 'LP-3' },
    { dt: '2019-08-03T16:14:30+08:00', id: 'HL-1106', type: 'House Loan', user: 'Tan Jia Sing', status: 'Pending Review', package: null },
    { dt: '2019-07-29T16:14:30+08:00', id: 'BL-1107', type: 'Business Loan', user: 'Tan Khai Ching', status: 'Rejected', package: 'LP-4' },
    { dt: '2019-07-29T16:14:30+08:00', id: 'PL-1108', type: 'Personal Loan', user: 'Soh Yee Lin', status: 'Rejected', package: null },
    { dt: '2019-07-29T16:14:30+08:00', id: 'CL-1109', type: 'Car Loan', user: 'Beh Wei Chuan', status: 'Rejected', package: 'LP-1' },
    { dt: '2019-07-29T16:14:30+08:00', id: 'HL-1110', type: 'House Loan', user: 'Tan Jia Sing', status: 'Rejected', package: null },
    { dt: '2019-07-29T16:14:30+08:00', id: 'BL-1111', type: 'Business Loan', user: 'Tan Khai Ching', status: 'Rejected', package: 'LP-2' },
    { dt: '2019-07-29T16:14:30+08:00', id: 'PL-1112', type: 'Personal Loan', user: 'Soh Yee Lin', status: 'Rejected', package: null },
    { dt: '2019-07-29T16:14:30+08:00', id: 'CL-1113', type: 'Car Loan', user: 'Beh Wei Chuan', status: 'Rejected', package: 'LP-3' },
    { dt: '2019-07-29T16:14:30+08:00', id: 'HL-1114', type: 'House Loan', user: 'Tan Jia Sing', status: 'Rejected', package: null },
    { dt: '2019-07-29T16:14:30+08:00', id: 'BL-1115', type: 'Business Loan', user: 'Tan Khai Ching', status: 'Rejected', package: 'LP-4' },
    { dt: '2019-07-29T16:14:30+08:00', id: 'PL-1116', type: 'Personal Loan', user: 'Soh Yee Lin', status: 'Rejected', package: null },
    { dt: '2019-07-29T16:14:30+08:00', id: 'CL-1117', type: 'Car Loan', user: 'Beh Wei Chuan', status: 'Rejected', package: 'LP-2' },
    { dt: '2019-07-29T16:14:30+08:00', id: 'HL-1118', type: 'House Loan', user: 'Tan Jia Sing', status: 'Rejected', package: null },
    { dt: '2019-07-29T16:14:30+08:00', id: 'BL-1119', type: 'Business Loan', user: 'Tan Khai Ching', status: 'Rejected', package: 'LP-3' },
    { dt: '2019-07-29T16:14:30+08:00', id: 'PL-1120', type: 'Personal Loan', user: 'Soh Yee Lin', status: 'Rejected', package: null }
  ];

  public loanType$ = [
    { code: 'CL', name: 'Car Loan', translation: 'Car Loan' },
    { code: 'HL', name: 'House Loan', translation: 'House Loan' },
    { code: 'PL', name: 'Personal Loan', translation: 'Personal Loan' },
    { code: 'BL', name: 'Business Loan', translation: 'Business Loan' },
  ];

  public status$ = [
    { code: 'PR', name: 'Pending Review', translation: 'Pending Review' },
    { code: 'WR', name: 'Waiting Reply', translation: 'Waiting Reply' },
    { code: 'IP', name: 'In Progress', translation: 'In Progress' },
    { code: 'C', name: 'Completed', translation: 'Completed' },
    { code: 'R', name: 'Rejected', translation: 'Rejected' }
  ];

  public displayedColumns: string[] = ['dt', 'id', 'type', 'user', 'status', 'package'];
  public dataSource = [];
  public page: number;
  public totalRecord: number = 0;
  public recordPerPage: number = 20;
  public search: string;
  public selectedType = [];
  public selectedStatus = [];
  public isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private cs: ComponentService
  ) { }

  ngOnInit() {
    this.selectedType = [...this.loanType$];
    this.selectedStatus = [...this.status$];
    this.dataSource = [];
    this.loadData();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      if (this.dataSource && this.dataSource.length > 0) {
        this.dataSource = [];
        this.loadData();
      }
    });
  }

  searchData() {
    this.dataSource = [];
    this.paginator.pageIndex = 0;
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    const pageNumber = (this.paginator.pageIndex ? this.paginator.pageIndex : 0) + 1;
    const orderBy = this.sort.direction ? this.sort.direction : 'desc';
    setTimeout(() => {
      let data = this.dummy$;
      if (this.search) {  //Search Filter
        const keyword = this.search;
        data = data.filter(task => { return task.id.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 || task.user.toLowerCase().indexOf(keyword.toLowerCase()) >= 0 });
      }
      data = data.filter(task => this.selectedType.find(type => type.name == task.type));  //Type Filter
      data = data.filter(task => this.selectedStatus.find(status => status.name == task.status));  //Status Filter
      if (orderBy == 'asc') {  //Date Sorting
        data = data.sort((a, b) => {
          if (a.dt > b.dt) { return 1 };
          if (a.dt < b.dt) { return -1 };
          return 0;
        });
      } else {
        data = data.sort((a, b) => {
          if (a.dt < b.dt) { return 1 };
          if (a.dt > b.dt) { return -1 };
          return 0;
        });
      }
      this.dataSource = [...data];
      this.totalRecord = data.length * this.recordPerPage;
      this.isLoading = false;
    }, 1000);
  }

  taskDetails(task) {
    const dialogRef = this.cs.openModal(BankTaskDetailsComponent, {
      data: task
    });
    dialogRef.subscribe(dialog => {
      if (dialog) {
        dialog.afterClosed().subscribe(res => {
          if (res) { /* Do Something */ }
          dialogRef.unsubscribe();
        });
      }
    });
  }

  toggleType(loanType, loanTypeSelect) {
    const index = this.selectedType.indexOf(loanType);

    if (index >= 0) {
      this.selectedType.splice(index, 1);
    } else {
      this.selectedType.push(loanType);
    }
    loanTypeSelect.writeValue(this.selectedType);
  }

  toggleStatus(status, statusSelect) {
    const index = this.selectedStatus.indexOf(status);

    if (index >= 0) {
      this.selectedStatus.splice(index, 1);
    } else {
      this.selectedStatus.push(status);
    }
    statusSelect.writeValue(this.selectedStatus);
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
