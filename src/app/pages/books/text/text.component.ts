import { Component, OnInit, Input,
         Output, EventEmitter } from '@angular/core';
import { Subject, Subscription, Observable, combineLatest, of } from 'rxjs';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material';
import { map, filter, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as text from '../../../state/actions/text';
import { Text } from '../../../model/text';
import get from 'lodash-es/get';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  change: Subject<any> = new Subject<any>();

  change$: Subscription;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Input() content: any;

  separatorKeysCodes = [ENTER, COMMA, SPACE];
  cache: any = {};

  text = ``;
  edit$: Observable<boolean>;

  namespace: number;
  category: number;
  lst_id: number;

  constructor(public snackBar: MatSnackBar,
              private _store: Store<any>,
              private _route: ActivatedRoute,
              private _http: HttpClient,
              private _router: Router) { }

  ngOnInit() {
    this.edit$ = this._store.select('browser').pipe(
      map( v => v.editMode )
    );

    combineLatest(
      this._route.params,
      this._store.select('text')).pipe(
      filter(([params, state]) => state.category)
    ).subscribe(([params, state]) => {
      this.namespace = +params['namespace'];
      this.category = +params['category'];
      this.lst_id = +params['list'];
      if ( this.lst_id ) {
        this.text = get(state.texts, `${state.category}.entities.${this.lst_id}.text`, '');
      }
    });
  }

  save() {
    of(null).pipe(
      withLatestFrom(this._store.select('text'))
    ).subscribe(([_, state]) => {
      const txt = state.texts[state.category].entities[this.lst_id];
      this._http.put(`/api/texts/${this.lst_id}`, {
        category: state.category,
        title: txt.title,
        text: this.text
      }).subscribe((v: {data: Text}) => {
        this._store.dispatch(new text.Update(state.category, <any>v.data));
      });
    });
  }

  handleClick($event) {
    const tag = get($event, 'target.tagName');
    if ( tag === 'A') {
      const href = get($event, 'target.href', '');
      if ( href.indexOf(window.location.origin) !== -1) {
        const url = href.replace(window.location.origin, '');
        this._router.navigateByUrl(url);
        $event.preventDefault();
      }
    }
  }
}
