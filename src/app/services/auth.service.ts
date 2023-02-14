import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ServerApiService } from './server-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: any = null;

  constructor(
    public afAuth: AngularFireAuth,
    private as: ServerApiService
  ) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  signUpWithEmail(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  signInWithEmail(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }).catch(err => {
        console.log(err)
        reject(err);
      });
    });
  }

  sendVerificationEmail(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.auth.currentUser.sendEmailVerification().then(res => {
        console.log('Verification Email Sent.')
        resolve(res);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  sendPasswordResetEmail(email): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
        console.log('Password Reset Email Sent.');
        resolve(true)
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  signOut(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.auth.signOut().then(() => {
        resolve(true);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  async setUser(authState?: any) {
    const firebaseUser = authState ? authState : this.afAuth.auth.currentUser;
    if (firebaseUser) {
      const value = await this.as.user.getSelf().toPromise();
      let roleArr: Array<string> = [];
      if (!value) return;
      value.roles.forEach(obj => roleArr.push(obj.roleCode));

      const user = {
        uid: value.uid,
        name: value.userCode,
        roles: roleArr,
        isActive: value.active,
        emailVerified: firebaseUser.emailVerified
      };

      window.localStorage.setItem('user', JSON.stringify(user));
      return user;
    } else {
      window.localStorage.setItem('user', JSON.stringify(null));
      return null;
    }
  }

  getFirebaseUser(): any {
    return this.afAuth.auth.currentUser;
  }

  getAuthState(): any {
    return this.authState;
  }

  getUser(): any {
    return JSON.parse(window.localStorage.getItem('user'));
  }

  userRoles(): Array<string> {
    const user = this.getUser();
    return user ? user.roles : null;
  }

  isLoggedIn(): boolean {
    const user = this.getUser();
    return (user && user.emailVerified) ? true : false;
  }

  // async anonymousLogin() {
  //   return this.afAuth.auth.signInAnonymously().then(() => console.log('successful login as anonymous')).catch(error => console.log(error));
  // }
}