import { Component, OnInit, ApplicationRef, PLATFORM_ID, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as browser from '../../state/actions/browser';
import { UserService } from '../../services/user.service';
import { map as o_map, mergeMap, filter, first, combineLatest, take } from 'rxjs/operators';
import { Observable, of, merge, ReplaySubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as category from '../../state/actions/category';
import * as text from '../../state/actions/text';
import { Category } from '../../model/category';
import get from 'lodash-es/get';
import compact from 'lodash-es/compact';
import { SearchService } from '../../element/search-bar/search-bar.service';
import { ObservableMedia } from '@angular/flex-layout';
import map from 'lodash-es/map';
import { isPlatformBrowser } from '@angular/common';

declare var ga;

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
    editMode$: Observable<any>;

    page: string;
    namespace: number;
    category: number;
    list: number;
    query: string;

    change$: ReplaySubject<any> = new ReplaySubject<any>(1);
    constructor(public _store: Store<any>,
                public _user: UserService,
                private _ref: ApplicationRef,
                private _route: ActivatedRoute,
                private _http: HttpClient,
                private _router: Router,
                private _search: SearchService,
                private _media: ObservableMedia,
                @Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {
        this._search.search.subscribe((v) => {
            this.change$.next({
                'namespace': this.namespace,
                'category': this.category,
                'list': this.list,
                'query': v,
                'page': this.page
            });
        });

        merge(
            this._route.params.pipe(
                combineLatest(this._route.queryParams),
                o_map(([params, q]) => {
                    return {
                        'category': +params['category'],
                        'namespace': +params['namespace'],
                        'list': +params['list'],
                        'query': q['query'],
                        'page': q['page']
                    };
                })
            ),
            this.change$
            ).pipe(
            mergeMap((params) => {
                this.category = +params['category'];
                this.list = +params['list'];

                this.page = params['page'];
                if ( this._media.isActive('lt-sm') && !this.page ) {
                    this.page = 'category';
                }

                if ( params['namespace'] && (this.namespace !== +params['namespace'] ||
                     this.query !== params['query'])) {
                    this.query = params['query'];
                    this.namespace = +params['namespace'];

                    const query = {'namespace': `${this.namespace}`};
                    if ( this.query ) {
                        query['query'] = this.query;
                    }
                    this._store.dispatch(new category.Clear());
                    this._store.dispatch(new text.Clear());
                    return this._http.get('/api/categories', {
                            params: query,
                            observe: 'body'
                        })
                        .pipe(
                            o_map((v: {data: Category[]}) => {
                                this._store.dispatch(new category.Clear());
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
                       o_map((state) => {
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
                        take(1),
                        o_map((state) => {
                            const ids = state.texts[state.category].ids;
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
            if ( this.namespace && isPlatformBrowser(this.platformId)) {
                ga('set', 'page', `/${this.namespace}l`);
                ga('send', 'pageview');
            }

            this._router.navigate(
                compact([
                    'books',
                    this.namespace,
                    this.category,
                    this.list
                ]), {
                    queryParams: {
                        query: this.query,
                        page: this.page,
                    },
                    queryParamsHandling: 'merge'
                });
        });

        this.editMode$ = this._store.select('browser').pipe(
            o_map ( v => v.editMode )
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

    navigate(item: any) {
        switch (item.type) {
            case 'category':
                let listId: number = this.list;
                if ( this.category !== item.id ) {
                    listId = undefined;
                }
                this.change$.next({
                    'namespace': this.namespace,
                    'category': item.id,
                    'list': listId,
                    'query': this.query,
                    'page': this._media.isActive('lt-sm') ? 'list' : undefined
                });
                break;
            case 'list':
                this.change$.next({
                    'namespace': this.namespace,
                    'category': this.category,
                    'list': item.id,
                    'query': this.query,
                    'page': this._media.isActive('lt-sm') ? 'text' : undefined
                });
                break;
        }
    }

    swipe(page: string) {
        // only work when at mobile phone screen size
        if (this._media.isActive('lt-sm')) {
            this.change$.next({
                'namespace': this.namespace,
                'category': this.category,
                'list': this.list,
                'query': this.query,
                'page': page
            });
        }
    }
}
