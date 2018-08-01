import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as namespace from '../actions/namespace';
import { category as cat_data} from '../../fake_data/namespaces';

@Injectable()
export class NamespaceEffects {
  // @Effect()
  // init(): Observable<Action> {
  //   // console.log('ss');
  //   // this.http.get('/api/namespaces').subscribe((v: any) => {
  //   //   console.log(v);
  //   //   this._store.dispatch(new namespace.AddAll(v.data));
  //   // });

  //   // return of({type: 'null'});
  // }
  // = this.actions$.pipe(
  //   map(v => {
  //     console.log(v);
  //     return {type: 'null'};
  //   })
  // );

  constructor(private http: HttpClient,
              private actions$: Actions,
              private _store: Store<any>) {
    // console.log('namespace effect');
  }
}
