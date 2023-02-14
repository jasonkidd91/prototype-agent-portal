import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sub-page-header',
  templateUrl: './sub-page-header.component.html',
  styleUrls: ['./sub-page-header.component.css']
})
export class SubPageHeaderComponent implements OnInit {

  @Input() page: string;
  @Input() pageParams: any;
  @Input() prevPage: string;
  @Input() prevPageParams: any;
  @Input() currentPage: string;
  @Input() currentPageParams: any;

  constructor() { }

  ngOnInit() {
  }

}
