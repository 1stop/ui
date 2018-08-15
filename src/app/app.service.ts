import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { environment } from '../environments/environment';
declare var ga: any;

@Injectable()
export class AppState {
    edit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    search: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
    load: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    sessionId: string;

    public user: any;

    constructor() {
        if ( environment.production ) {
            // ga((tracker) => {
            //   this.sessionId = tracker.get('clientId');
            // });
        }
    }

    load_user(user: any) {
        this.user = user;
    }
}
