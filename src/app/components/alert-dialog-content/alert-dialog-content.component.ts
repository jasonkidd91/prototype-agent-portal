import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface AlertDialogConfig {
  title?: string;
  message?: string;
  labelClose?: string;
}

@Component({
  selector: 'app-alert-dialog-content',
  templateUrl: './alert-dialog-content.component.html',
  styleUrls: ['./alert-dialog-content.component.css']
})
export class AlertDialogContentComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogConfig) {
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
