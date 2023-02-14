import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-notifications',
  templateUrl: './bank-notifications.component.html',
  styleUrls: ['./bank-notifications.component.css']
})
export class BankNotificationsComponent implements OnInit {

  public date$ = new Date();

  constructor() { }

  ngOnInit() {
  }

}
