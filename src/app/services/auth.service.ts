import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, Observer } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { find } from 'lodash';

@Injectable()
export class AuthService {
  namespaces: any;

  constructor(private _http: HttpClient) { }

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot ): Observable<boolean> | boolean {
    if ( !this.namespaces ){
        return this._http.get('/api/namespaces').map((v)=>{
          return find(v, { short: route.params.ns }) != undefined;
        });
    } else {
        return find(this.namespaces, { short: route.params.ns }) != undefined;
    }
   }

  authStatus(): Observable<any> {
    return Observable.create((obs: Observer<any>)=>{
      firebase.auth().onAuthStateChanged(function(user) {
          obs.next(user);
          obs.complete();
        });
    });
  }

  loginWithGoogle(): Observable<any> {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      firebase.auth().languageCode = 'en';
      return Observable.fromPromise(firebase.auth().signInWithPopup(provider)).catch(()=>{
          return Observable.of(undefined);
      });
  }
}
