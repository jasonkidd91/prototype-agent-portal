import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ApplicationDetailsComponent>) { }

  ngOnInit() {
  }

}
