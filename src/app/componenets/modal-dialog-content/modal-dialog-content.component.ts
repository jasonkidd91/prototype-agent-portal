import { Component, OnInit, Inject, Injector, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ModalDialogConfig {
  data?: any;
  backdropClose?: boolean;
  hideCloseButton?: boolean;
  padding?: boolean;
  title?: string;
  width?: string;
  height?: string;
}

@Component({
  selector: 'app-modal-dialog-content',
  templateUrl: './modal-dialog-content.component.html',
  styleUrls: ['./modal-dialog-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalDialogContentComponent implements OnInit {

  dataInjector: Injector;

  constructor(public dialogRef: MatDialogRef<ModalDialogContentComponent>,
    private injector: Injector,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataInjector = Injector.create([
      {
        provide: MAT_DIALOG_DATA,
        useValue: {
          ...this.data.data  // Values to be passed to refered component
        }
      }
    ], this.injector);
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }

}

/*

--------------------------------------
20190718@Wcbeh
Version 1.0
--------------------------------------
Remarks: Creation

*/