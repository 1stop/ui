import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as category from '../actions/category';
import * as text from '../actions/text';
import each from 'lodash-es/each';

@Injectable()
export class CategoryEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType('[Category] ADD_ALL'),
    mergeMap((action: any) => {
      each(action.categories, (c) => {
        if (c.text) {
          this._store.dispatch(new text.AddAll(c.id, c.text));
        }
      });
        return of({type: 'empty'});
    })
  );

  constructor(private http: HttpClient,
              private actions$: Actions,
              private _store: Store<any>) {}
}
