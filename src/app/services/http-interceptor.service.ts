import { Injectable, Optional, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { mergeMap } from 'rxjs/operators';
import { ORIGIN_HOST } from '../app.token';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable()
export class FirebaseInterceptor implements HttpInterceptor {
    constructor(public _auth: AngularFireAuth,
                @Optional() @Inject(ORIGIN_HOST) private origin: string,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (isPlatformServer(this.platformId)) {
            if ( request.url.match('^/api/')) {
                request = request.clone({ url: `${this.origin}${request.url}`});
            }
            return next.handle(request);
        } else {
            return next.handle(request);
        }

        // HACK, restore
        // return this._auth.idToken.pipe(
        //     mergeMap(token => {
        //         if ( token ) {
        //             request = request.clone({
        //                 setHeaders: {
        //                     Authorization: `Bearer ${token}`
        //                 }
        //             });
        //         }
        //         return next.handle(request);
        //     })
        // );
    }
}
