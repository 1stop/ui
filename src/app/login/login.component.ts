// tslint:disable:max-line-length
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';

import { PasswordValidator } from './validators/password.validator';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginDialogComponent {

    // New User
    // userName: FormControl = new FormControl('', [Validators.required]);
    // password: FormControl = new FormControl('', [Validators.required]);
    // confirmPassword: FormControl = new FormControl('', [Validators.required]);
    // email: FormControl = new FormControl('', [Validators.required, Validators.email]);
    // contact: FormControl = new FormControl('', [Validators.required]);
    // company: FormControl = new FormControl('', [Validators.required]);
    // location: FormControl = new FormControl('', [Validators.required]);
    // birthdate: FormControl = new FormControl('', [Validators.required, Validators.email]);

    // Login
    email: FormControl = new FormControl('', [Validators.required, Validators.email]);
    password: FormControl = new FormControl('', [Validators.required]);

    userDetailsForm; 
    // matching_passwords_group;

    errorMessage: string;
    statusMessage: string;

    // account_validation_messages = {
    //     'username': [
    //         { type: 'required', message: 'Username is required' },
    //         { type: 'minlength', message: 'Username must be at least 5 characters long' },
    //         { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
    //         { type: 'pattern', message: 'Your username must contain only numbers and letters' },
    //         { type: 'validUsername', message: 'Your username has already been taken' }
    //         ],
    //     'email': [
    //         { type: 'required', message: 'Email is required' },
    //         { type: 'email', message: 'Enter a valid email' }
    //     ],
    //     'confirm_password': [
    //         { type: 'required', message: 'Confirm password is required' },
    //         { type: 'areEqual', message: 'Password mismatch' }
    //     ],
    //     'password': [
    //         { type: 'required', message: 'Password is required' },
    //         { type: 'minlength', message: 'Password must be at least 6 characters long' },
    //         { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    //     ],
    //     'terms': [
    //         { type: 'pattern', message: 'You must accept terms and conditions' }
    //     ]
    // }

    constructor(
        public dialogRef: MatDialogRef<LoginDialogComponent>,
        public afAuth: AngularFireAuth,
        private formBuilder: FormBuilder) {
            this.userDetailsForm = this.formBuilder.group({
                email: new FormControl('', [Validators.required, Validators.email]),
                matching_passwords: new FormGroup({
                    password: new FormControl('', Validators.compose([
                         Validators.minLength(6),
                         Validators.required,
                         Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
                        ])),
                    confirm_password: new FormControl('', Validators.required)
                }, (formGroup: FormGroup) => {
                     return PasswordValidator.areEqual(formGroup);
                })
            });
        }

    login(provider: string) {
        switch (provider) {
            case 'password':
                this.afAuth.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(() => {
                    this.dialogRef.close();
                }).catch((error)=> {
                    this.errorMessage = this.updateStatusMessage(error.message);
                });
                break;
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
            // case 'email':
            //     this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider()).then(() => {
            //         this.dialogRef.close();
            //     });
        }

    }

    register(details: any) {
        this.afAuth.auth.createUserWithEmailAndPassword(
            details.email, details.matching_passwords.password).then(()=>{
                this.dialogRef.close();
            }).catch((error)=> {
                this.errorMessage = this.updateStatusMessage(error.message);
        });
    }

    clearFieldsContentAndMessage() {
        this.errorMessage = '';
        this.statusMessage = '';
    }

    resetPassword() {
        this.afAuth.auth.sendPasswordResetEmail(this.email.value).then(()=>{
            this.statusMessage = this.updateStatusMessage('Password reset email was sent');
        }).catch((error)=> {
            this.errorMessage = this.updateStatusMessage(error.message);
        });
    }

    updateStatusMessage(message: string) {
        this.clearFieldsContentAndMessage();
        return message;
    }

    onSubmitUserDetails(val) {
        console.log(val);
    }
}