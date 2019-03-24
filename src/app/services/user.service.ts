// tslint:disable:max-line-length
import { Injectable, Component, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';


import { LoginDialogComponent } from './../login/login.component';

@Injectable()
export class UserService {
    user: ReplaySubject<any> = new ReplaySubject<any>(1);
    auth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    authUI: any;
    constructor(public dialog: MatDialog,
                public afAuth: AngularFireAuth,
                private _ref: ApplicationRef) {
        this.afAuth.auth.onAuthStateChanged((user) => {
            this._ref.tick();
            this.user.next(user);

            if ( user && ['sindrosa.24@gmail.com', 'chyeap89@gmail.com', 'greatspirit828@gmail.com', 'info@proatoz.com', 'ericyong96@gmail.com'].indexOf(user.email) !== -1) {
                this.auth.next(true);
            } else {
                this.auth.next(false);
            }
            // this._ref.tick();
        });
    }

    login() {
        this.dialog.open(LoginDialogComponent, {width: '370px'});
    }

    userDetails(ev: any) {
        this.dialog.open(UserDetailsComponent, {
            position: { right: '5px', top: '65px' }
        });
    }
}


@Component({
    selector: 'app-user-details-dialog',
    template: `<div fxLayout="column">
        <!-- <div class="list-item"> Account </div> -->
        <div class="list-item" (click)="logout()"> Logout </div>
    </div>`,
    styles: [`
        div.list-item:hover {
            background-color: gainsboro; 
        }
        div.list-item { 
            cursor: pointer;
            padding: 0.5rem;
        }
    `]
    
})

export class UserDetailsComponent {

    constructor(
        public dialogRef: MatDialogRef<UserDetailsComponent>,
        public afAuth: AngularFireAuth,
        private _router: Router) {}

    logout() {
        this.afAuth.auth.signOut().then(()=> {
            // Sign-out successful.
            this.dialogRef.close();
            this._router.navigate(['']);
        }).catch((error)=> {
            // An error happened.
        });
    }
}