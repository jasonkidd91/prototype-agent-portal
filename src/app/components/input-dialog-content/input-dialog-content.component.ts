import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface InputDialogConfig {
  title?: string;
  message?: string;
  placeholder?: string;
  value?: any;
  labelSubmit?: string;
  labelCancel?: string;
}

@Component({
  selector: 'app-input-dialog-content',
  templateUrl: './input-dialog-content.component.html',
  styleUrls: ['./input-dialog-content.component.css']
})
export class InputDialogContentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InputDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InputDialogConfig) {
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}

/*

--------------------------------------
20190626@Wcbeh
Version 1.0
--------------------------------------
Remarks: Creation

*/
