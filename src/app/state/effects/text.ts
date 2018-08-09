import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, zip, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import * as text from '../actions/text';
import { Text } from '../../model/text';

@Injectable()
export class TextEffects {
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType('[Text] SET CATEGORY'),
    mergeMap((action: any) => {
      return zip(
        this._store.select('category'),
        this._store.select('text')).pipe(
        take(1),
        mergeMap(([cat, txt]) => {
          if (txt.texts[action.category] === undefined ) {
            const textUrl = cat.entities[action.category].textUrl;
            return this.http.get(textUrl).pipe(
              map((v: {data: Text[]}) => {
                return new text.AddAll(action.category, v.data);
              })
            );
          }
          return of({type: 'null'});
        })
      );
    })
  );

  constructor(private http: HttpClient,
              private actions$: Actions,
              private _store: Store<any>) {}
}
