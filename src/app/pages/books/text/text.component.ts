import { Component, OnInit, Input, ElementRef, SimpleChanges,
         Output, EventEmitter, OnChanges } from '@angular/core';
import { Subject, Subscription, Observable, merge, combineLatest, of } from 'rxjs';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { isEmpty, get, set } from 'lodash';
import { debounceTime, distinct, map, filter, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as text from '../../../state/actions/text';
import { Text } from '../../../model/text';

import 'codemirror/addon/display/autorefresh.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
//import 'codemirror/addon/lint/javascript-lint.js';
//import 'codemirror/addon/lint/lint.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed';

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

  readonly config: any = {
    mode: 'htmlmixed',
    lineNumbers: true,
    indentUnit: 4,
    autoCloseBrackets: true,
    matchBrackets: true,
    autoRefresh: true,
    autofocus: true,
    //gutter: ['CodeMirror-lint-markers']
  };

  constructor(public snackBar: MatSnackBar,
              private _store: Store<any>,
              private _route: ActivatedRoute,
              private _http: HttpClient) { }

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

      this.text = get(state.texts[state.category][this.lst_id], 'text', '');
    });

    // this.change$ = merge(
    //     this.change.pipe(debounceTime(1000)),
    //     this.save
    // ).pipe(
    //   distinct((v: any) => {
    //     return `${v.id}${v.text}${get(v, 'tags', []).join('')}`;
    //   })
    // ).subscribe((v) => {
    //   this._save(v.id, v.text, v.tags);
    // });
  }

  // edit() {
  //   this.cache = {
  //     text: get(this.content, 'data.text' , ''),
  //     tags: get(this.content, 'data.tag' , []),
  //     id: this.content.id
  //   };

  //   this.change.next(this.cache);
  // }

  // addTag(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   const tags = get(this.content, 'data.tag' , []);

  //   if ((value || '').trim()) {
  //     tags.push(value.trim());
  //   }

  //   if (input) {
  //     input.value = '';
  //   }

  //   set(this.content, 'data.tag', tags);
  //   this.edit();
  // }

  // removeTag(tag: any): void {
  //   const tags = get(this.content, 'data.tag' , []);
  //   const index = tags.indexOf(tag);

  //   if (index >= 0) {
  //     tags.splice(index, 1);
  //   }

  //   set(this.content, 'data.tag', tags);
  //   this.edit();
  // }

  log() {
    console.log('asdas');
  }

  save() {
    of(null).pipe(
      withLatestFrom(this._store.select('text'))
    ).subscribe(([_, state]) => {
      const txt = state.texts[state.category][this.lst_id];
      this._http.put(`/api/texts/${this.lst_id}`, {
        category: state.category,
        title: txt.title,
        text: this.text
      }).subscribe((v: {data: Text}) => {
        this._store.dispatch(new text.Update(state.category, v.data));
      });
    });
  }
}
