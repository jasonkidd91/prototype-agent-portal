import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentService } from 'src/app/services/component.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public email: string;

  constructor(private translate: TranslateService,
    private authService: AuthService,
    private cs: ComponentService) { }

  ngOnInit() {
  }

  getPasswordResetEmail() {
    const email = this.email;
    if (this.isValidate()) {
      this.cs.showLoading();
      this.authService.sendPasswordResetEmail(this.email).then(() => {
        this.email = null;
        this.cs.alert({
          title: this.translate.instant('alert.forgot_password.title.mail_sent'),
          message: this.translate.instant('alert.forgot_password.message.mail_sent', { email: email })
        });
        this.cs.hideLoading();
      }).catch(err => {
        console.log(err);
        this.cs.toastError(err);
        this.cs.hideLoading();
      });
    }
  }

  isValidate(): boolean {
    if (!this.email) {
      this.cs.toastError('error.message.email_mandatory');
      return false;
    }
    return true;
  }

}
