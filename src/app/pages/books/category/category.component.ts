import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../../model/category';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Namespace } from '../../../model/namespace';
import { SelectionModel } from '@angular/cdk/collections';
import * as category from '../../../state/actions/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Output() select: EventEmitter<number> = new EventEmitter<number>();
  categories$: Observable<Category[]>;
  edit$: Observable<boolean>;
  namespace: string;
  category: number;

  edited = new SelectionModel<number>(true);

  constructor(private _store: Store<any>,
              private _router: Router,
              private _http: HttpClient,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.category = +params['category'];
    });

    this.categories$ = this._store.select('category').pipe(
      map( v => Object.values(v.entities))
    );

    this.edit$ = this._store.select('browser').pipe(
      map( v => v.editMode )
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
}
