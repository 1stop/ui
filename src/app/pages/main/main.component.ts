import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import values from 'lodash-es/values';
import { Store } from '@ngrx/store';
import * as browser from '../../state/actions/browser';
import * as namespace from '../../state/actions/namespace';
import { suggestion } from '../../fake_data/suggestion';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Namespace } from '../../model/namespace';
import { Update } from '@ngrx/entity';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  suggestion$: Observable<string>;
  namespaces$: Observable<any[]>;

  constructor(public _store: Store<any>,
              private _http: HttpClient,
              private _dialog: MatDialog,
              private _router: Router,
              public _user: UserService,
              @Inject(PLATFORM_ID) private platformId: Object
              ) {}

  ngOnInit() {
    setTimeout(() => {
      this._store.dispatch(new browser.SearchOff());
    });

    this.namespaces$ = this._store.select('namespace').pipe(
      map((v) => values(v.entities))
    );

    this._http.get('/api/namespaces').pipe(
      map((v: any) => v.data )
    ).subscribe((data) => {
      this._store.dispatch(new namespace.AddAll(data));
    });

    if (isPlatformBrowser(this.platformId)) {
      this.suggestion$ = interval(4000).pipe(
        map( v => suggestion[ v % 3] )
      );
    }
  }

  edit(ns: any) {
    this._dialog.open(DialogComponent, {
      width: '80vw',
      data: ns
    }).afterClosed().subscribe((data) => {
      console.log('close', data);
      if ( data ) {
        this._http.put(`/api/namespaces/${data.id}`, {
          title: data.title,
          short: data.short,
          background: data.background
        }).subscribe((v: {data: Update<Namespace>}) => {
          this._store.dispatch(new namespace.Update(v.data));
        });
      }
    });
  }

  add() {
    this._dialog.open(DialogComponent, {
      width: '80vw'
    }).afterClosed().subscribe((data) => {
      if ( data ) {
        this._http.post('/api/namespaces', {
          title: data.title,
          short: data.short,
          background: data.background
        }).subscribe((v: {data: Namespace}) => {
          this._store.dispatch(new namespace.Create(v.data));
        });
      }
    });
  }
}
