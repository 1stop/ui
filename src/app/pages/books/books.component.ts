import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as browser from '../../state/actions/browser';
import { UserService } from '../../services/user.service';
import { map, mergeMap, takeUntil, skipUntil, filter, first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as category from '../../state/actions/category';
import * as text from '../../state/actions/text';
import { Category } from '../../model/category';
import get from 'lodash-es/get';
import compact from 'lodash-es/compact';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
    editMode$: Observable<any>;
    _swipe: string;

    namespace: number;
    category: number;
    list: number;

    constructor(public _store: Store<any>,
                public _user: UserService,
                private _ref: ApplicationRef,
                private _route: ActivatedRoute,
                private _http: HttpClient,
                private _router: Router) {}

    listId = 1;

    ngOnInit() {
        this._route.params.pipe(
            mergeMap((params) => {
                this.category = +params['category'];
                this.list = +params['list'];
                if ( this.namespace !== +params['namespace']) {
                    this.namespace = +params['namespace'];
                    return this._http.get(`/api/categories?namespace=${this.namespace}`)
                                .pipe(
                                    map((v: {data: Category[]}) => {
                                        this._store.dispatch(new category.AddAll(v.data));
                                        const cat_ids = v.data.map(d => d.id);
                                        if (!this.category || cat_ids.indexOf(this.category) === -1) {
                                            this.category = get(v.data, '[0].id');
                                        }
                                        if ( this.category ) {
                                            this._store.dispatch(new text.SetCategory(this.category));
                                            return true;
                                        }
                                        return false;
                                    })
                                );
                } else {
                    return this._store.select('category').pipe(
                        map((state) => {
                            if (this.category && state.ids.indexOf(this.category) !== -1) {
                                this._store.dispatch(new text.SetCategory(this.category));
                                return true;
                            }
                        })
                    );
                }
            }),
            mergeMap((cat: boolean) => {
                if ( cat ) {
                    return this._store.select('text').pipe(
                        filter(state => state.texts[state.category] !== undefined ),
                        first(),
                        map((state) => {
                            const ids = Object.keys(state.texts[state.category]).map(v => +v);
                            if ( !this.list || ids.indexOf(this.list) === -1) {
                                this.list = ids[0];
                            }
                        })
                    );
                } else {
                    return of(null);
                }
            })
        ).subscribe(() => {
            this._router.navigate(compact(['books', this.namespace, this.category, this.list]));
        });
        // ((params) => {
        //     this.namespace = +params['namespace'];
        //     this.category = +params['category'];
        //     this.list = +params['list'];

        //     if ( this.namespace !== params['namespace']) {
        //       this.namespace = params['namespace'];
        //       this._http.get(`/api/categories?namespace=${this.namespace}`).subscribe((v: {data: Category[]}) => {
        //         this._store.dispatch(new category.AddAll(v.data));
        //         if (!this.category) {
        //           this.category = v.data[0].id;
        //         }
        //         this._store.dispatch(new text.SetCategory(this.category));
        //       });
        //     } else {
        //       this._store.dispatch(new text.SetCategory(this.category));
        //     }
        //   });


        this.editMode$ = this._store.select('browser').pipe(
            map ( v => v.editMode )
        );
        this._store.dispatch( new browser.SearchOn());
    }

    toggle(flag: boolean) {
        if ( flag ) {
            this._store.dispatch( new browser.EditOn());
        } else {
            this._store.dispatch( new browser.EditOff());
        }
        this._ref.tick();
    }

    navigate(id: number, type: 'category' | 'list') {
        switch (type) {
            case 'category':
                this._router.navigate(['books', this.namespace, id]);
                break;
            case 'list':
                this._router.navigate(['books', this.namespace, this.category, id]);
                break;
        }
    }
}
