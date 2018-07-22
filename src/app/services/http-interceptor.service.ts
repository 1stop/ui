import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class FirebaseInterceptor implements HttpInterceptor {
    constructor(public _auth: AngularFireAuth) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this._auth.idToken.pipe(
            mergeMap(token => {
                if ( token ) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }
                return next.handle(request);
            })
        );
    }
}
