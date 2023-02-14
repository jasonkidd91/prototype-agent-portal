import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface LoadingSpinnerConfig {
  duration?: number,
  backdropClose?: boolean
}

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}

/*

--------------------------------------
20190705@Wcbeh
Version 1.0
--------------------------------------
Remarks: Creation

*/