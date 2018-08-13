// tslint:disable:max-line-length
import { Injectable, Component, ApplicationRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebaseui/dist/firebaseui.css';
import { AngularFireAuth } from 'angularfire2/auth';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
    user: ReplaySubject<any> = new ReplaySubject<any>(1);
    auth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    authUI: any;
    constructor(public dialog: MatDialog,
                public afAuth: AngularFireAuth,
                private _ref: ApplicationRef) {
        this.afAuth.auth.onAuthStateChanged((user) => {
            this.user.next(user);
            if ( ['sindrosa.24@gmail.com', 'chyeap89@gmail.com'].indexOf(user.email) !== -1) {
                this.auth.next(true);
            }
            this._ref.tick();
        });
    }

    login() {
        this.dialog.open(LoginDialogComponent, {});
    }
}


@Component({
    selector: 'app-login-dialog',
    template: `<div id="firebaseui-auth-container">
    <div id="firebaseui-auth-container" lang="en">
        <div class="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in">
            <div class="firebaseui-card-content">
                <form onsubmit="return false;">
                    <ul class="firebaseui-idp-list">
                        <li class="firebaseui-list-item">
                            <button (click)="login('google')" class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" data-provider-id="google.com" data-upgraded=",MaterialButton"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Google</span><span class="firebaseui-idp-text firebaseui-idp-text-short">Google</span></button>
                        </li>
                        <li class="firebaseui-list-item">
                            <button (click)="login('facebook')" class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-facebook firebaseui-id-idp-button" data-provider-id="facebook.com" data-upgraded=",MaterialButton"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Facebook</span><span class="firebaseui-idp-text firebaseui-idp-text-short">Facebook</span></button>
                        </li>
                        <li class="firebaseui-list-item">
                            <button (click)="login('email')" class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button" data-provider-id="password" data-upgraded=",MaterialButton"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">Sign in with email</span><span class="firebaseui-idp-text firebaseui-idp-text-short">Email</span></button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="firebaseui-card-footer firebaseui-provider-sign-in-footer">
                <p class="firebaseui-tos firebaseui-tospp-full-message">By continuing, you are indicating that you accept our <a href="https://en.wikipedia.org/wiki/Terms_of_service" class="firebaseui-link firebaseui-tos-link" target="_blank">Terms of Service</a> and <a href="https://www.google.com" class="firebaseui-link firebaseui-pp-link" target="_blank">Privacy Policy</a>.</p>
            </div>
        </div>
    </div>
</div>`,
})
export class LoginDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<LoginDialogComponent>,
        public afAuth: AngularFireAuth) {}
    login(provider: string) {
        switch (provider) {
            case 'google':
                this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
                    this.dialogRef.close();
                });
                break;
            case 'facebook':
                this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
                    this.dialogRef.close();
                });
                break;
            case 'email':
                this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider()).then(() => {
                    this.dialogRef.close();
                });
        }

    }
}
