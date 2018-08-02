import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as category from '../../../state/actions/category';
import { Observable } from 'rxjs';
import { Category } from '../../../model/category';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Namespace } from '../../../model/namespace';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  edit$: Observable<boolean>;
  namespace: string;

  edited = new SelectionModel<number>(true);

  constructor(private _route: ActivatedRoute,
              private _store: Store<any>,
              private _router: Router,
              private _http: HttpClient) { }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      if ( this.namespace !== params['namespace']) {
        this.namespace = params['namespace'];
        this._http.get(`/api/categories?namespace=${this.namespace}`).subscribe((v: {data: Category[]}) => {
          this._store.dispatch(new category.AddAll(v.data));
        });
      }
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

  select(id: string) {
    this._router.navigate(['books', this.namespace, id]);
  }

  ngOnDestroy() {

  }
}
