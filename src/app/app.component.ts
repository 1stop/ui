import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { AppState } from './app.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';
import { get, findIndex } from 'lodash';
import { UserService } from './services/user.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

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
              private _router: Router ) {}

  ngOnInit() {
    this.searchbar$ = this._store.select('browser').pipe(
                        map(state => state.searchbar )
                      );
  }

  toggle() {
    this.state.edit.next(!this.state.edit.value);
  }

  navigateToHome() {
    if (this._router.url !== '/')
      this._router.navigate(['']);
  }
}
