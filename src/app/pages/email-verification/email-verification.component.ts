import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentService } from 'src/app/services/component.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private authService: AuthService,
    private cs: ComponentService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  resendVerificationEmail() {
    this.cs.showLoading();
    this.authService.sendVerificationEmail().then(res => {
      setTimeout(() => {
        this.cs.hideLoading();
        this.cs.toast('info.message.verification_mail_sent');
      }, 2000);
    }).catch(err => {
      console.log(err);
      this.cs.toastError('error.message.relogin_error');
      this.cs.hideLoading();
      this.openSignIn();
    });
  }

  openSignIn(): void {
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
    this.dialog.open(SignInComponent, dialogConfig);
  }

  reloadPage() {
    window.location.reload();
  }

}
