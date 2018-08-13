import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subject, Subscription, Observable, of } from 'rxjs';
import { map, filter, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as text from '../../../state/actions/text';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import values from 'lodash-es/values';
import { Text } from '../../../model/text';

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
    @Output() select: EventEmitter<number> = new EventEmitter<number>();
    @Input() keyword: string;
    @Input() categoryId: string;
    @Input() selectedId: string;

    t = '';

    public completeText = '';


    list$: Observable<any>;
    edited = new SelectionModel<number>(true);
    lst_id: number;
    namespace: number;
    category: number;

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

      this.edit$ = this._store.select('browser').pipe(
        map( v => v.editMode)
      );

      this.list$ = this._store.select('text').pipe(
        filter( v => v.category ),
        map( v => values(v.texts[v.category]))
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
          this._store.dispatch(new text.Update(state.category, v.data));
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
