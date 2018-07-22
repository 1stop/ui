import { Injectable, Component, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';
import { MatDialog, MatDialogRef } from '@angular/material';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebaseui/dist/firebaseui.css';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

const UI_CONFIG = {
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: 'https://en.wikipedia.org/wiki/Terms_of_service',
    privacyPolicyUrl: 'https://www.google.com'
  };


@Injectable()
export class UserService {
    user: ReplaySubject<any> = new ReplaySubject<any>(1);
    authUI: any;
    constructor(public dialog: MatDialog,
                public afAuth: AngularFireAuth) {
        this.authUI = new firebaseui.auth.AuthUI(firebase.auth());
        this.afAuth.auth.onAuthStateChanged((user) => {
            this.user.next(user);
        });
        this.user.subscribe((v) => { console.log(v); });

        (<any>window).login = () => {
            this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).then((v) => {
                console.log('logged in');
            });

        };
    }

    login() {
        this.dialog.open(LoginDialogComponent, {});
    }
}


@Component({
    selector: 'app-login-dialog',
    template: `<div id="firebaseui-auth-container"></div>`,
})
export class LoginDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<LoginDialogComponent>,
        private _user: UserService) {}

    ngOnInit() {
        this._user.authUI.start('#firebaseui-auth-container', UI_CONFIG);
    }
}
