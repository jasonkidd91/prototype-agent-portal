import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';
import { InputDialogConfig } from '../input-dialog-content/input-dialog-content.component';

@Component({
  selector: 'sws-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  @Input() label: string;
  @Input() color: string;
  @Input() customContent: boolean = false;
  @Input() dialogTitle: string = '';
  @Input() dialogMessage: string = '';
  @Input() dialogPlaceholder: string = '';
  @Input() dialogValue: string = '';
  @Output() onReturn: EventEmitter<any> = new EventEmitter();

  constructor(private service: ComponentService) { }

  ngOnInit() {

  }

  openDialog() {
    const dialogConfig: InputDialogConfig = {
      title: this.dialogTitle,
      message: this.dialogMessage,
      placeholder: this.dialogPlaceholder,
      value: this.dialogValue
    }
    this.service.promptInput(dialogConfig).subscribe(res => {
      this.onReturn.emit(res);
    });
  }

}

/*

--------------------------------------
20190626@Wcbeh
Version 1.0
--------------------------------------
Remarks: Creation

*/