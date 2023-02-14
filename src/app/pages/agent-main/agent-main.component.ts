import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-main',
  templateUrl: './agent-main.component.html',
  styleUrls: ['./agent-main.component.css']
})
export class AgentMainComponent implements OnInit {

  public date$ = new Date();

  constructor() { }

  ngOnInit() {
  }

}
