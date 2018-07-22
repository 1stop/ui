import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import find from 'lodash-es/find';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  namespaces: any;

  constructor(private _http: HttpClient) { }

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot ): Observable<boolean> | boolean {
    if ( !this.namespaces ) {
        return this._http.get('/api/namespaces').pipe(map((v) => {
          return find(v, { short: route.params.ns }) !== undefined;
        }));
    } else {
        return find(this.namespaces, { short: route.params.ns }) !== undefined;
    }
   }
}
