import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SignInComponent } from '../pages/sign-in/sign-in.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private authState: any = null;

  constructor(private router: Router,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private dialog: MatDialog) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.authState.pipe(
      take(1),
      map(authState => {
        this.authState = authState;
        const authenticated = !!authState;
        const accessRoute = next.routeConfig.path;

        // Special Path Handling
        if (accessRoute === 'verify-email') {
          //Logged in but email not verified
          if (authenticated && !authState.emailVerified) {
            console.log('Logged In, Email Not Verified!');
            return true;
          } else {
            console.log('No Email Verification Required!');
            this.router.navigate(['/']);
            return false;
          }
        }

        if (authenticated) {
          //Authenticated && Email Verified
          //Role Checking...
          const userRoles = this.authService.userRoles();
          const accessRole = next.data.role;
          if (!accessRole || (accessRole && userRoles.indexOf(accessRole) > -1)) {
            return true;
          } else {
            this.router.navigate(['../PageNotFound']);
            return false;
          }
        }

        console.log('Login Required!');
        const dialogConfig: MatDialogConfig = {
          disableClose: false,
          width: '668px',
          height: '480px',
          panelClass: 'no-padding-modal'
        }
        this.dialog.open(SignInComponent, dialogConfig);
        if (this.router.routerState.snapshot.url === '')    // Prevent blank when user direct access from url
          this.router.navigate(['/']);
        return false;
      })
    );

    // const accessRoute = next.routeConfig.path;
    // const user = this.authService.getUser();
    // //Special Path Handling
    // if (accessRoute === 'verify-email') {
    //   if (user && !user.emailVerified) {
    //     return true;
    //   } else {
    //     console.log('No Email Verification Required!');
    //     this.router.navigate(['/']);
    //     return false;
    //   }
    // }

    // if (this.authService.isLoggedIn()) {
    //   //Authenticated && Email Verified
    //   //Role Checking...
    //   const userRoles = this.authService.userRoles();
    //   const accessRole = next.data.role;
    //   if (!accessRole || (accessRole && userRoles.indexOf(accessRole) > -1)) {
    //     return true;
    //   } else {
    //     this.router.navigate(['../PageNotFound']);
    //     return false;
    //   }
    // }

    // const dialogConfig: MatDialogConfig = {
    //   disableClose: false,
    //   width: '668px',
    //   height: '480px',
    //   panelClass: 'no-padding-modal'
    // }
    // this.dialog.open(SignInComponent, dialogConfig);
    // if (this.router.routerState.snapshot.url === '')    // Prevent blank when user direct access from url
    //   this.router.navigate(['/'])
    // return false;
  }
}
