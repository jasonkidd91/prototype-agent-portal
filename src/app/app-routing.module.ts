import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ApplyLoanComponent } from './pages/apply-loan/apply-loan.component';
import { ApplyCcComponent } from './pages/apply-cc/apply-cc.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { UserApplicationComponent } from './pages/user-application/user-application.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AgentSignInComponent } from './pages/agent-sign-in/agent-sign-in.component';
import { PageNoFoundComponent } from './pages/page-no-found/page-no-found.component';
import { AuthGuard } from './guards/auth-guard.service';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { PackageListComponent } from './pages/package-list/package-list.component';
import { AgentMainComponent } from './pages/agent-main/agent-main.component';
import { AgentLoanListComponent } from './pages/agent-loan-list/agent-loan-list.component';
import { AgentOpenLoanComponent } from './pages/agent-open-loan/agent-open-loan.component';
import { AgentCloseLoanComponent } from './pages/agent-close-loan/agent-close-loan.component';
import { UserNotificationsComponent } from './pages/user-notifications/user-notifications.component';
import { BankNotificationsComponent } from './pages/bank-notifications/bank-notifications.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BankTaskListComponent } from './pages/bank-task-list/bank-task-list.component';
import { JoinUsAgentComponent } from './pages/join-us-agent/join-us-agent.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'verify-email', component: EmailVerificationComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'packages', component: PackageListComponent },
  { path: 'apply-loan/package=:id', component: ApplyLoanComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
  { path: 'apply-loan', component: ApplyLoanComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
  { path: 'apply-credit-card', component: ApplyCcComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'join-us', component: JoinUsAgentComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'my-profile', component: UserProfileComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
  {
    path: 'spaces', component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'USER' },
    children: [
      { path: 'index', component: UserNotificationsComponent },
      { path: 'application/:type', component: UserApplicationComponent },
      { path: '', redirectTo: 'index', pathMatch: 'full' }
    ]
  },
  // { path: 'agent', component: AgentSignInComponent },
  {
    path: 'agent', component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'AGENT' },
    children: [
      { path: 'index', component: AgentMainComponent },
      { path: 'list', component: AgentLoanListComponent },
      { path: 'open', component: AgentOpenLoanComponent },
      { path: 'closed', component: AgentCloseLoanComponent },
      { path: '', redirectTo: 'index', pathMatch: 'full' }
    ]
  },
  {
    path: 'bank', component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'AGENT' },
    children: [
      { path: 'index', component: BankNotificationsComponent },
      { path: 'tasks', component: BankTaskListComponent },
      { path: '', redirectTo: 'index', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'PageNotFound' },
  { path: 'PageNotFound', component: PageNoFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
