import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as category from '../actions/category';
import { category as cat_data} from '../../fake_data/namespaces';

@Injectable()
export class CategoryEffects {

  constructor(private http: HttpClient, private actions$: Actions) {}
}
