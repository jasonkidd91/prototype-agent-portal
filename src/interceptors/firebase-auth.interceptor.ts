import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Constant } from 'src/app/constant';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class FirebaseAuthInterceptor implements HttpInterceptor {
    constructor(
        private as: AuthService,
        private ts: TranslateService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!(req.url.match(`${Constant.API.SERVER_URL}/public\/`) || req.url.match('\/assets\/i18n\/'))) {
            return from(this.handleAccess(req, next, true));
        } else {
            return from(this.handleAccess(req, next));
        }
    }

    private async handleAccess(req: HttpRequest<any>, next: HttpHandler, isTokenNeeded?: boolean): Promise<HttpEvent<any>> {
        req = req.clone({
            headers: req.headers.set(Constant.PARAMETER.LANGUAGE_CODE, window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : Constant.DEFAULT_VALUE.LANGUAGE_CODE)
        });

        if (isTokenNeeded) {
            req = req.clone({
                headers: req.headers.set(Constant.PARAMETER.FIREBASE_TOKEN, await this.as.afAuth.auth.currentUser.getIdToken())
            });
        }
        
        return next.handle(req).toPromise();
    }
}