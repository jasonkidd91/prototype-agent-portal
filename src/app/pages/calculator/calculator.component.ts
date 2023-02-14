import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalculatorComponent implements OnInit {

  amount: number = 100000;
  period: number = 1;
  interest: number = 5;

  constructor() { }

  ngOnInit() {
  }

}
