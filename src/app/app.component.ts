import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AppState } from './app.service';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
declare var ga;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  query = '';
  searching = false;
  searchbar$: Observable<any>;

  constructor(public state: AppState,
              private _auth: AuthService,
              public _user: UserService,
              public _store: Store<any>,
              @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.searchbar$ = this._store.select('browser').pipe(
                        map(state => state.searchbar )
                      );
    if (isPlatformBrowser(this.platformId) && environment.production) {
      ga('create', 'UA-113077174-1', 'auto');
      ga('send', 'pageview');
    }
  }

  toggle() {
    this.state.edit.next(!this.state.edit.value);
  }
}
