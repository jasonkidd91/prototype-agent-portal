import { Injectable } from '@angular/core';
import { InputDialogConfig, InputDialogContentComponent } from '../components/input-dialog-content/input-dialog-content.component';
import { MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig, MatDialogRef } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConfirmDialogConfig, ConfirmDialogContentComponent } from '../components/confirm-dialog-content/confirm-dialog-content.component';
import { AlertDialogContentComponent, AlertDialogConfig } from '../components/alert-dialog-content/alert-dialog-content.component';
import { LoadingSpinnerComponent, LoadingSpinnerConfig } from '../components/loading-spinner/loading-spinner.component';
import { TranslateService } from '@ngx-translate/core';
import { ModalDialogContentComponent, ModalDialogConfig } from '../componenets/modal-dialog-content/modal-dialog-content.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private translate: TranslateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  private loadingShown: boolean;
  private loadingDialog: MatDialogRef<LoadingSpinnerComponent>;
  async showLoading(message?: string, opts?: LoadingSpinnerConfig) {
    if (!this.loadingShown) {
      opts = opts ? opts : {};
      const dialogConfig: MatDialogConfig = {
        disableClose: opts.backdropClose ? false : true,
        panelClass: 'transparent',
        data: {
          message: message
        }
      }
      await Promise.resolve().then(() => { this.loadingDialog = this.dialog.open(LoadingSpinnerComponent, dialogConfig); });
      this.loadingShown = true;

      this.loadingDialog.afterClosed().subscribe(() => {
        this.loadingShown = false;
      });

      if (opts.duration) {
        setTimeout(() => {
          this.loadingDialog.close();
        }, opts.duration);
      }
    }
  }

  hideLoading() {
    if (this.loadingShown) {
      this.loadingDialog.close();
    }
  }

  openModal(pageComponent: any, opts?: ModalDialogConfig): BehaviorSubject<MatDialogRef<any>> {
    let modalRef = new BehaviorSubject<MatDialogRef<any>>(null);
    opts = { ...opts };
    let dialogConfig: MatDialogConfig = {
      disableClose: !opts.backdropClose ? true : false,
      width: opts.width,
      height: opts.height,
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      },
      data: {
        ...opts,
        component: pageComponent
      },
      panelClass: 'sws-modal-component'
    };
    setTimeout(() => {
      const dialogRef = this.dialog.open(ModalDialogContentComponent, dialogConfig);
      modalRef.next(dialogRef);
    });
    return modalRef;
  }

  promptInput(opts?: InputDialogConfig, width?: string, height?: string): Observable<any> {
    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      panelClass: '',
      data: { ...opts }
    }
    if (width) { dialogConfig.width = width; };
    if (height) { dialogConfig.height = height; };
    const dialogRef = this.dialog.open(InputDialogContentComponent, dialogConfig);
    return dialogRef.afterClosed();
  }

  confirm(opts?: ConfirmDialogConfig, width?: string, height?: string): Observable<any> {
    const dialogConfig: MatDialogConfig = {
      disableClose: true,
      panelClass: '',
      data: { ...opts }
    }
    if (width) { dialogConfig.width = width; };
    if (height) { dialogConfig.height = height; };
    const dialogRef = this.dialog.open(ConfirmDialogContentComponent, dialogConfig);
    return dialogRef.afterClosed();
  }

  alert(opts?: AlertDialogConfig, width?: string, height?: string): Observable<any> {
    const dialogConfig: MatDialogConfig = {
      disableClose: true,
      panelClass: '',
      data: { ...opts }
    }
    if (width) { dialogConfig.width = width; };
    if (height) { dialogConfig.height = height; };
    const dialogRef = this.dialog.open(AlertDialogContentComponent, dialogConfig);
    return dialogRef.afterClosed();
  }

  toast(message: string, duration?: number, closeLabel?: string) {
    const _closeLabel = closeLabel ? this.translate.instant(closeLabel) : this.translate.instant('common.text.dismiss');
    const snackBarConfig: MatSnackBarConfig = {
      duration: duration ? duration : 3000
    }
    const snackBarRef = this.snackBar.open(this.translate.instant(message), _closeLabel, snackBarConfig);
    return snackBarRef;
  }

  toastError(err: any) {
    let errorMessage = this.errorMessageHandling(err);
    const snackBarConfig: MatSnackBarConfig = {
      duration: 5000,
      panelClass: 'toast-error'
    }
    const snackBarRef = this.snackBar.open(errorMessage, this.translate.instant('common.text.dismiss'), snackBarConfig);
    return snackBarRef;
  }

  errorMessageHandling(err: any): string {
    const emptyMessage = this.translate.instant('error.message.no_message_display');
    if (!err) {
      return emptyMessage;
    }

    if (typeof err === 'string') {
      return this.translate.instant(err);
    }

    let error = err;
    if (err.error && err.error.code) {
      error = err.error;
    }

    if (error.code) {
      //Firebase/Backend Error Handling
      switch (error.code) {
        case '%Error Code%': return this.translate.instant('%Error Message%');
        default: return error.message ? error.message : emptyMessage;
      }
    } else {
      return error;
    }
  }
}
