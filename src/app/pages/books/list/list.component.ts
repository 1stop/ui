import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subject, Subscription, Observable, of } from 'rxjs';
import { map as o_map, filter, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as text from '../../../state/actions/text';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import values from 'lodash-es/values';
import { Text } from '../../../model/text';
import get from 'lodash-es/get';
import map from 'lodash-es/map';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  edit$: Observable<boolean>;

  @Input() lists: any[] = [];
  change: Subject<boolean> = new Subject();
  change$: Subscription;
  @Output() highlight: EventEmitter<any> = new EventEmitter<any>();
  @Input() keyword: string;
  @Input() categoryId: string;
  @Input() namespaceId: string;
  @Input() selectedId: string;

  list$: Observable<any>;
  edited = new SelectionModel<number>(true);
  lst_id: number;
  namespace: number;
  category: number;
  query: any;

  constructor(private _route: ActivatedRoute,
              private _store: Store<any>,
              private _http: HttpClient,
              private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.namespace = +params['namespace'];
      this.category = +params['category'];
      this.lst_id = +params['list'];
    });

    this._route.queryParams.subscribe((params) => {
      this.query = params['query'];
    });

    this.edit$ = this._store.select('browser').pipe(
      o_map( v => v.editMode)
    );

    this.list$ = this._store.select('text').pipe(
      filter( v => v.category ),
      o_map( v => {
        const ids = get(v.texts, `${v.category}.ids`);
        if ( ids ) {
          const entity = get(v.texts, `${v.category}.entities`);
          return map(ids, (id) => {
            return entity[id];
          });
        } else {
          return [];
        }
      })
    );
  }

  add(title: string) {
    of(null).pipe(
      withLatestFrom(this._store.select('text'))
    ).subscribe(([_, state]) => {
      this._http.post('/api/texts', {
        category: state.category,
        title: title
      }).subscribe((v: { data: Text}) => {
        this._store.dispatch(new text.Create(state.category, v.data));
      });
    });
  }

  edit(id: number, title: string) {
    of(null).pipe(
      withLatestFrom(this._store.select('text'))
    ).subscribe(([_, state]) => {
      this._http.put(`/api/texts/${id}`, {
        category: state.category,
        title: title
      }).subscribe((v: {data: Text}) => {
        this._store.dispatch(new text.Update(state.category, <any>v.data));
        this.edited.deselect(id);
      });
    });
  }

  delete(id: number) {
    of(null).pipe(
      withLatestFrom(this._store.select('text'))
    ).subscribe(([_, state]) => {
      this._http.delete(`/api/texts/${id}`)
        .subscribe((v: {data: Text}) => {
          this._store.dispatch(new text.Delete(state.category, id));
          this.edited.deselect(id);
        });
    });
  }
}
