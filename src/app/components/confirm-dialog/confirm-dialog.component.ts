import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';
import { ConfirmDialogConfig } from '../confirm-dialog-content/confirm-dialog-content.component';

@Component({
  selector: 'sws-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() label: string;
  @Input() color: string;
  @Input() customContent: boolean = false;
  @Input() dialogTitle: string = '';
  @Input() dialogMessage: string = '';
  @Output() onReturn: EventEmitter<any> = new EventEmitter();

  constructor(private service: ComponentService) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig: ConfirmDialogConfig = {
      title: this.dialogTitle,
      message: this.dialogMessage
    }
    this.service.confirm(dialogConfig).subscribe(res => {
      this.onReturn.emit(res);
    });
  }

}

/*

--------------------------------------
20190703@Wcbeh
Version 1.0
--------------------------------------
Remarks: Creation

*/
