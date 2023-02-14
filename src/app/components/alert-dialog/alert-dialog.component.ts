import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';
import { AlertDialogConfig } from '../alert-dialog-content/alert-dialog-content.component';

@Component({
  selector: 'sws-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  @Input() label: string;
  @Input() color: string;
  @Input() customContent: boolean = false;
  @Input() dialogTitle: string = '';
  @Input() dialogMessage: string = '';
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(private service: ComponentService) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig: AlertDialogConfig = {
      title: this.dialogTitle,
      message: this.dialogMessage
    }
    this.service.alert(dialogConfig).subscribe(res => {
      this.onClose.emit(res);
    });
  }

}

/*

--------------------------------------
20190705@Wcbeh
Version 1.0
--------------------------------------
Remarks: Creation

*/