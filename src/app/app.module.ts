import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from 'src/environments/environment';

//Angular Fire
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';

//ngx-translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule, MatBadgeModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCarouselModule } from '@ngmodule/material-carousel';

//Components
import { ModalDialogContentComponent } from './componenets/modal-dialog-content/modal-dialog-content.component';
import { InputDialogContentComponent } from './components/input-dialog-content/input-dialog-content.component';
import { InputDialogComponent } from './components/input-dialog/input-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogContentComponent } from './components/confirm-dialog-content/confirm-dialog-content.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { AlertDialogContentComponent } from './components/alert-dialog-content/alert-dialog-content.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

//Pages
import { MainNavComponent } from './main-nav/main-nav.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ApplyLoanComponent } from './pages/apply-loan/apply-loan.component';
import { ApplyCcComponent } from './pages/apply-cc/apply-cc.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserApplicationComponent } from './pages/user-application/user-application.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AgentSignInComponent } from './pages/agent-sign-in/agent-sign-in.component';
import { ApplicationDetailsComponent } from './pages/application-details/application-details.component';
import { LoanDetailsComponent } from './pages/loan-details/loan-details.component';
import { PageNoFoundComponent } from './pages/page-no-found/page-no-found.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { SubPageHeaderComponent } from './pages/sub-page-header/sub-page-header.component';
import { PackageDetailsComponent } from './pages/package-details/package-details.component';
import { PackageListComponent } from './pages/package-list/package-list.component';
import { AgentMainComponent } from './pages/agent-main/agent-main.component';
import { AgentLoanListComponent } from './pages/agent-loan-list/agent-loan-list.component';
import { AgentOpenLoanComponent } from './pages/agent-open-loan/agent-open-loan.component';
import { AgentCloseLoanComponent } from './pages/agent-close-loan/agent-close-loan.component';
import { UserNotificationsComponent } from './pages/user-notifications/user-notifications.component';
import { BankOfferDetailsComponent } from './pages/bank-offer-details/bank-offer-details.component';
import { BankNotificationsComponent } from './pages/bank-notifications/bank-notifications.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreditHistoryComponent } from './pages/credit-history/credit-history.component';
import { CreditReloadComponent } from './pages/credit-reload/credit-reload.component';
import { FirebaseAuthInterceptor } from 'src/interceptors/firebase-auth.interceptor';
import { OnlyDigitDirective } from './directives/only-digit.directive';
import { NgxMaskModule } from 'ngx-mask';
import { BankTaskListComponent } from './pages/bank-task-list/bank-task-list.component';
import { BankTaskDetailsComponent } from './pages/bank-task-details/bank-task-details.component';
import { JoinUsAgentComponent } from './pages/join-us-agent/join-us-agent.component';
import { AgentSummaryComponent } from './pages/agent-summary/agent-summary.component';
import { StringPipe } from './pipes/string.pipe';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    SignInComponent,
    HomeComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ApplyLoanComponent,
    ApplyCcComponent,
    CalculatorComponent,
    UserProfileComponent,
    UserApplicationComponent,
    AboutUsComponent,
    AgentSignInComponent,
    ApplicationDetailsComponent,
    LoanDetailsComponent,
    PageNoFoundComponent,
    InputDialogContentComponent,
    InputDialogComponent,
    ConfirmDialogComponent,
    ConfirmDialogContentComponent,
    AlertDialogComponent,
    AlertDialogContentComponent,
    LoadingSpinnerComponent,
    EmailVerificationComponent,
    SubPageHeaderComponent,
    PackageDetailsComponent,
    ModalDialogContentComponent,
    PackageListComponent,
    AgentMainComponent,
    AgentLoanListComponent,
    AgentOpenLoanComponent,
    AgentCloseLoanComponent,
    UserNotificationsComponent,
    BankOfferDetailsComponent,
    BankNotificationsComponent,
    DashboardComponent,
    CreditHistoryComponent,
    CreditReloadComponent,
    OnlyDigitDirective,
    BankTaskListComponent,
    BankTaskDetailsComponent,
    JoinUsAgentComponent,
    AgentSummaryComponent,
    StringPipe
  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    LayoutModule,
    NgbModule,
    MatCarouselModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({ showMaskTyped : true })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: FirebaseAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InputDialogContentComponent,
    ConfirmDialogContentComponent,
    AlertDialogContentComponent,
    LoadingSpinnerComponent,
    SignInComponent,
    ApplicationDetailsComponent,
    PackageDetailsComponent,
    ModalDialogContentComponent,
    CreditHistoryComponent,
    CreditReloadComponent,
    BankOfferDetailsComponent,
    BankTaskDetailsComponent,
    AgentSummaryComponent
  ]
})
export class AppModule { }