import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';
import { PackageDetailsComponent } from '../package-details/package-details.component';
import { Router } from '@angular/router';
import { ServerApiService } from 'src/app/services/server-api.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Packages } from 'src/app/models/packages';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public showContent: boolean = false;
  public selectedLoan: string = '';
  public loanType$ = [];
  public loanList$ = [];
  public page: number = 1;
  private languageSubscription: Subscription;

  constructor (
    private router: Router,
    private cs: ComponentService,
    private sas: ServerApiService,
    private ts: TranslateService
  ) {
    this.languageSubscription = this.ts.onLangChange.subscribe((event: LangChangeEvent) => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.cs.showLoading();
    this.sas.public.loanType.getAll().subscribe(loanTypes => {
      this.loanType$ = loanTypes;
      if (loanTypes && loanTypes.length > 0 && this.selectedLoan === '') this.selectedLoan = loanTypes[0].code;
      this.cs.hideLoading();
      this.reinitialize();
      this.loadData(0);
    }, err => {
      this.cs.hideLoading();
      this.cs.toastError(err);
    });
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  reinitialize() {
    this.loanList$ = [];
    this.page = 0;
  }

  loadData(page: number) {
    this.isLoading = true;
    this.cs.showLoading();
    this.sas.public.package.getActivePackageByLoanType(this.selectedLoan, page).subscribe(packages => {
      if (packages && packages.length > 0) {
        this.loanList$ = this.loanList$.concat(packages);
        this.page += 1;
      }
      this.isLoading = false;
      this.cs.hideLoading();
    }, err => {
      this.cs.hideLoading();
      this.cs.toastError(err);
    });
  }

  loadMore() {
    this.loadData(this.page + 1);
  }

  onLoanTypeSelect(loanType: string) {
    this.selectedLoan = loanType;
    this.reinitialize();
    this.loadData(0);
  }

  applyLoan(packages: Packages) {
    this.router.navigate(['../apply-loan', { packages: JSON.stringify(packages) }]);
  }

  packageDetails(packages: Packages) {
    this.cs.openModal(PackageDetailsComponent, {
      data: packages
    });
  }
}