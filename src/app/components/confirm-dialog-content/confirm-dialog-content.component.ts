import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface ConfirmDialogConfig {
  title?: string;
  message?: string;
  labelYes?: string;
  labelNo?: string;
}

@Component({
  selector: 'app-confirm-dialog-content',
  templateUrl: './confirm-dialog-content.component.html',
  styleUrls: ['./confirm-dialog-content.component.css']
})
export class ConfirmDialogContentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogConfig) { }

  ngOnInit() {
  }

}
