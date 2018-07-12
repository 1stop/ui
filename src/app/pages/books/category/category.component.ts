import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as category from '../../../state/actions/category';
import { Observable } from 'rxjs';
import { Category } from '../../../model/category';
import { map } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  edit$: Observable<boolean>;
  namespace: string;

  constructor(private _route: ActivatedRoute,
              private _store: Store<any>,
              private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.namespace = params['namespace'];
      this._store.dispatch(new category.Query(this.namespace));
    });

    this.categories$ = this._store.select('category').pipe(
      map( v => Object.values(v.entities))
    );

    this.edit$ = this._store.select('browser').pipe(
      map( v => v.editMode )
    );

  }

  add() {

  }

  // edit(category: any) {

  // }

  delete(id: string, $event) {

  }

  select(id: string) {
    this._router.navigate(['books', this.namespace, id]);
  }

  ngOnDestroy() {

  }
}
