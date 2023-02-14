import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentService } from 'src/app/services/component.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialogRef: MatDialogRef<SignInComponent>,
    private cs: ComponentService) { }

  ngOnInit() {
  }

  signIn() {
    if (this.isValidate()) {
      this.cs.showLoading();
      this.authService.signInWithEmail(this.email, this.password).then(authState => {
        if (authState && authState.emailVerified) {
          const user = this.authService.getUser();
          if (user.roles.indexOf('AGENT') > -1) {
            this.router.navigate(['../dashboard'], { relativeTo: this.route });
          } else {
            this.router.navigate(['../home'], { relativeTo: this.route });
          }
        } else {
          this.router.navigate(['../verify-email'], { relativeTo: this.route });
        }
        this.dialogRef.close();
        this.cs.hideLoading();
      }).catch(err => {
        console.log(err);
        this.cs.toastError(err)
        this.cs.hideLoading();
      });
    }
  }

  isValidate(): boolean {
    if (!this.email) {
      this.cs.toastError('error.message.email_mandatory')
      return false;
    }
    if (!this.password) {
      this.cs.toastError('error.message.password_mandatory')
      return false;
    }
    return true;
  }

  signUp() {
    this.router.navigate(['../signup'], { relativeTo: this.route });
    this.dialogRef.close();
  }

  forgotPassword() {
    this.router.navigate(['../forgot-password'], { relativeTo: this.route });
    this.dialogRef.close();
  }

}
