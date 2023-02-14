import { Component, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { ComponentService } from '../services/component.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from '../constant';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  lang$: string;
  availableLang$ = [
    { code: 'en', name: 'English', icon: 'us' },
    { code: 'zh', name: '中文', icon: 'cn' },
    { code: 'ms', name: 'Bahasa', icon: 'my' }
  ];

  currentDate$ = new Date();
  user = this.authService.getUser();

  backTopBtn: boolean = false;
  sticky: boolean = false;
  activeMenu$: string;
  $menu = [
    {
      name: 'Home',
      translation: 'page.home.menu.name',
      icon: 'home',
      url: '/home',
      visible: true
    }, {
      name: 'Packages',
      translation: 'page.packages.menu.name',
      icon: 'view_carousel',
      url: '/packages',
      visible: true
    }, {
      name: 'Loans',
      translation: 'page.loans.menu.name',
      icon: 'account_balance',
      url: '/apply-loan',
      visible: true
    }, {
      name: 'Credit Cards',
      translation: 'page.credit_cards.menu.name',
      icon: 'credit_card',
      url: '/apply-credit-card',
      visible: false
    }, {
      name: 'Mortgages',
      translation: 'page.mortgages.menu.name',
      icon: 'how_to_vote',
      url: '',
      visible: false
    }, {
      name: 'Calculator',
      translation: 'page.calculator.menu.name',
      icon: 'iso',
      url: '/calculator',
      visible: true
    }, {
      name: 'Credit Reports',
      translation: 'page.credit_reports.menu.name',
      icon: 'description',
      url: '',
      visible: false
    }, {
      name: 'Agents',
      translation: 'page.join_us_agent.menu.name',
      icon: 'group',
      url: '/join-us',
      visible: true
    }, {
      name: 'About Us',
      translation: 'page.about_us.menu.name',
      icon: 'info',
      url: '/about-us', //https://www.calculator.com.my/home-loan-calculator
      visible: true
    }
  ];
  shortName = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private translate: TranslateService,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    private authService: AuthService,
    private cs: ComponentService
  ) {
    this.afAuth.authState.subscribe((firebaseUser) => {
      this.asyncUser(firebaseUser);
    });
    this.router.events.subscribe((event: Event) => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
        this.activeMenu$ = event.url;
      }
    });
  }

  private async asyncUser(firebaseUser: firebase.User) {
    const user = await this.authService.setUser(firebaseUser);

    if (!user) return;

    this.user = user;
    this.shortName = '';
    let arr = user.name.split(' ');
    arr.forEach(str => this.shortName = this.shortName.concat(str.charAt(0)));

    if (this.authService.isLoggedIn()) {
      console.log('User logged in');
    } else {
      if (!user) {
        // console.log('Not logged in, login with anonymous');
        // this.signInAnonymous();
      } else if (!user.emailVerified) {
        console.log('User logged in, email not verified yet');
      }
    }
  }

  ngOnInit() {
    const lang = window.localStorage.getItem('lang');
    this.lang$ = lang ? lang : 'en';
    this.translate.setDefaultLang(Constant.DEFAULT_VALUE.LANGUAGE_CODE.toLowerCase());
    this.translate.use(this.lang$);
  }

  langSelected(): any {
    const lang = this.availableLang$.find(l => l.code == this.lang$);
    return lang;
  }

  langChoices(): any {
    const choices = this.availableLang$.filter(l => l.code != this.lang$);
    return choices;
  }

  setLanguage(code) {
    window.localStorage.setItem('lang', code);
    this.lang$ = code;
    this.translate.use(code);
  }

  openSignIn(): void {
    // const dialogRef = this.dialog.open(SignInComponent, {
    //   width: '250px',
    //   data: { name: this.name, animal: this.animal }
    // });
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      width: '668px',
      height: '480px',
      panelClass: 'no-padding-modal',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      },
    }
    // dialogConfig.disableClose = false;
    //     dialogConfig.autoFocus = true;
    //     dialogConfig.position = {
    //       top: '',
    //         bottom: '',
    //         left: '',
    //         right: ''
    //   };
    //   dialogConfig.width = '700px';
    //   dialogConfig.height = '500px';
    //   dialogConfig
    this.dialog.open(SignInComponent, dialogConfig);
  }

  signOut() {
    this.cs.confirm({
      title: this.translate.instant('alert.logout.title'),
      message: this.translate.instant('alert.logout.message')
    }).subscribe(res => {
      if (res) {
        this.cs.showLoading();
        this.authService.signOut().then(() => {
          this.cs.toast('info.message.logout_success');
          this.router.navigate(['../home'], { relativeTo: this.route });
          this.user = null;
          this.cs.hideLoading();
        }).catch(err => {
          console.log(err);
          this.cs.toastError(err);
          this.cs.hideLoading();
        });
      }
    });
  }

  isLogin() {
    return this.user && this.user.emailVerified;
  }

  isAgent() {
    return (this.user && this.user.roles.indexOf('AGENT') > -1) ? true : false;
  }

  // private async signInAnonymous() {
  //   await this.authService.anonymousLogin();
  // }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll > 64) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }

    if(windowScroll > 800) {
      this.backTopBtn = true
    } else {
      this.backTopBtn = false;
    }
  }

  scrollToTop() {
    window.scroll(0,0);
  }
}