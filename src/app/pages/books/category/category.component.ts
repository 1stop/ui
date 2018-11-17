import { Component, OnInit, EventEmitter, Output, PLATFORM_ID, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../../model/category';
import { map as o_map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Namespace } from '../../../model/namespace';
import { SelectionModel } from '@angular/cdk/collections';
import * as category from '../../../state/actions/category';
import map from 'lodash-es/map';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  categories$: Observable<Category[]>;
  edit$: Observable<boolean>;
  namespace: number;
  category: number;

  edited = new SelectionModel<number>(true);
  isSSR = false;

  constructor(private _store: Store<any>,
              private _http: HttpClient,
              private _route: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.isSSR = isPlatformServer(this.platformId);

    this._route.params.subscribe((params) => {
      this.category = +params['category'];
      this.namespace = +params['namespace'];
    });

    this.categories$ = this._store.select('category').pipe(
      o_map( v => {
        return map(v.ids, id => v.entities[id]);
      })
    );

    this.edit$ = this._store.select('browser').pipe(
      o_map( v => v.editMode )
    );
  }

  add(title: string = '') {
    if ( title.trim().length === 0 ) {
      return;
    }

    this._http.post('/api/categories', {
      title: title,
      namespace: this.namespace
    }).subscribe((v: {data: Namespace}) => {
      this._store.dispatch(new category.Create(v.data));
    });
  }

  edit(id: number, title: string) {
    this._http.put(`/api/categories/${id}`, {
      title: title
    }).subscribe((v: {data: Namespace}) => {
      this._store.dispatch(new category.Create(v.data));
      this.edited.deselect(id);
    });
  }

  delete(id: number, $event) {
    this._http.delete(`/api/categories/${id}`)
      .subscribe((v: {data: Namespace}) => {
        this._store.dispatch(new category.Delete(id));
        this.edited.deselect(id);
      });
  }

  opend(id: string) {
    this.select.emit({id: id, type: 'category'});
  }
}
