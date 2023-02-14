import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ComponentService } from 'src/app/services/component.service';
import { CreditHistoryComponent } from '../credit-history/credit-history.component';
import { CreditReloadComponent } from '../credit-reload/credit-reload.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private user_menu$ = [
    // { name: 'Notifications', translation: 'Notifications', icon: 'notifications', url: 'index', visible: true },
    { name: 'Home', translation: 'Home', icon: 'home', url: 'index', visible: true },
    { name: 'Agent Applications', translation: 'Agent Case', icon: 'people', url: 'application/agent', params: { type: 'agent' }, visible: true },
    { name: 'Bank Applications', translation: 'Bank Case', icon: 'account_balance', url: 'application/bank', params: { type: 'bank' }, visible: true }
  ];
  private agent_menu$ = [
    { name: 'Home', translation: 'Home', icon: 'home', url: 'index', visible: true },
    { name: 'Loan List', translation: 'Loan List', icon: 'search', url: 'list', visible: true },
    { name: 'Tasks', translation: 'Tasks', icon: 'view_list', url: 'open', visible: true },
    { name: 'Closed Tasks', translation: 'Closed Tasks', icon: 'check_box', url: 'closed', visible: true }
  ];
  private bank_menu$ = [
    { name: 'Home', translation: 'Home', icon: 'home', url: 'index', visible: true },
    { name: 'Task List', translation: 'Task List', icon: 'view_list', url: 'tasks', visible: true }
  ];

  public menu$ = [];
  public subscription: Subscription = new Subscription();
  public activeRoute: string;
  public dashboardType: 'Agent' | 'Bank' | 'User';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private cs: ComponentService) {
    const subscription = this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ).subscribe((event) => {
      // console.log(event['url']);
      // console.log(this.route.firstChild.routeConfig.path);
      this.activeRoute = this.route.firstChild.routeConfig.path;
      this.dashboardType = this.switchDashboardType(event['url'].split('\/')[1]);
      this.initialize();
    });
    console.log('[DashboardComponent]: Navigation Subscription');
    this.subscription.add(subscription);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('[DashboardComponent]: Subscription Destroyed');
    this.subscription.unsubscribe();
  }

  switchDashboardType(pathUrl): 'Agent' | 'Bank' | 'User' {
    switch (pathUrl) {
      case 'spaces': return 'User';
      case 'agent': return 'Agent';
      case 'bank': return 'Bank';
      default: return null;
    }
  }

  isUser() { return this.dashboardType == 'User'; }
  isAgent() { return this.dashboardType == 'Agent'; }
  isBank() { return this.dashboardType == 'Bank'; }

  initialize() {
    if (this.isUser()) {
      this.menu$ = this.user_menu$;
    } else if (this.isAgent()) {
      this.menu$ = this.agent_menu$;
    } else if (this.isBank()) {
      this.menu$ = this.bank_menu$;
    } else {
      this.menu$ = [];
    }
  }

  switchPageTitle(): string {
    if (this.isUser()) {
      return 'page.user_spaces.name'
    } else if (this.isAgent()) {
      return 'page.agent_dashboard.name'
    } else if (this.isBank()) {
      return 'page.bank_office.name';
    } else {
      return '';
    }
  }

  switchPageSubtitle(): string {
    if (this.isUser()) {
      return 'page.user_spaces.sub_name'
    } else if (this.isAgent()) {
      return 'page.agent_dashboard.sub_name'
    } else if (this.isBank()) {
      return 'page.bank_office.sub_name';
    } else {
      return '';
    }
  }

  creditHistory() {
    this.cs.openModal(CreditHistoryComponent, {
      title: 'Credit History'
    });
  }

  creditReload() {
    this.cs.openModal(CreditReloadComponent, {
      title: 'Top Up Credit'
    });
  }

}
