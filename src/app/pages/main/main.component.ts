import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { Router } from '@angular/router';
import cloneDeep from 'lodash-es/cloneDeep';
import each from 'lodash-es/each';
import filter from 'lodash-es/filter';
import compact from 'lodash-es/compact';
import { Store } from '@ngrx/store';
import * as browser from '../../state/actions/browser';
import { suggestion } from '../../fake_data/suggestion';
import { map } from 'rxjs/operators';
import { namespaces } from '../../fake_data/namespaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    suggestion$: Observable<string>;
    namespaces = namespaces;

    constructor(public _store: Store<any>) {}

    ngOnInit() {
      setTimeout(() => {
        this._store.dispatch(new browser.SearchOff());
      });

      this.suggestion$ = interval(4000).pipe(
        map( v => suggestion[ v % 3] )
      );
    }
    // list: any[] = [];
    // allBooks: any[] = [];
    // books: any[] = [];
    // categories: any[] = [];
    // public selectedCategory: string;

    // favourites: any[] = [];
    // historiies: any[] = [];
    // srcKeys: any[] = [];

    // column = 1;
    // media$: Subscription;
    // constructor(public media: ObservableMedia,
    //             private http: HttpClient,
    //             public state: AppState,
    //             public dialog: MatDialog,
    //             private _router: Router ) { }

    // ngOnInit() {
    //     this.media$ = this.media.subscribe((change: MediaChange) => {
    //         switch (change.mqAlias) {
    //             case 'xs':
    //                 this.column = 1;
    //                 break;
    //             case 'sm':
    //             case 'md':
    //                 this.column = 2;
    //                 break;
    //             case 'lg':
    //             case 'xl':
    //                 this.column = 3;
    //                 break;
    //         }
    //     });

    //     // get category list
    //     this.categories = [
    //         {
    //             id: 'osha',
    //             name: 'Safety and Health',
    //             type: 'book',
    //             description: `The <b>OSHA</b> or <b>Occupational Safety and Health
    //             Administration</b> is an department of the Malaysia under Ministry
    //             of Human Resource which is reponsible for labour safety, sets and
    //             enforces protective workplace safety and health standards. OSHA
    //              also provides information, training and assistance to employers and workers`
    //         },
    //         // { id: 'civil', name: 'Civil', type: 'book'},
    //         { id: 'account', name: 'Account', type: 'book'},
    //         { id: 'physics', name: 'Physics', type: 'book'},
    //         { id: 'biology', name: 'Biology', type: 'book'},
    //         { id: 'personal', name: 'Personal', type: 'info'}
    //     ];

    //     this.srcKeys = ['OSHA', 'Safety', 'Chemical'];

    //     this.http.get('/api/namespaces').subscribe((v: any[]) => {
    //         // this.allBooks = v['data'] || [];
    //         // sample books
    //         this.allBooks = [
    //             {
    //                 id: 1,
    //                 name: 'Occupational Safety and Health Acts 1994',
    //                 category: 'osha',
    //                 author: 'House of Representatives Malaysia',
    //                 editor: 'ABC',
    //                 date: '25/2/1994',
    //                 edition: '',
    //                 description: 'This book contains some OSHA acts and regulation',
    //                 bookmark: true,
    //                 favorite: true
    //             },
    //             {
    //                 id: 2,
    //                 name: 'Bio 2',
    //                 category: 'biology',
    //                 description: '..'
    //             },
    //             {
    //                 id: 3,
    //                 name: 'Physics 1',
    //                 category: 'physics',
    //                 description: '..',
    //                 favorite: true
    //             },
    //             {
    //                 id: 4,
    //                 name: 'Safety 2',
    //                 category: 'osha',
    //                 description: '..',
    //                 bookmark: true
    //             },
    //             {
    //                 id: 5,
    //                 name: 'Account 1',
    //                 category: 'account',
    //                 description: '..'
    //             }
    //         ];

    //         this.books = cloneDeep(this.allBooks);
    //         this.onCategoryChange(0);
    //     });
    // }

    // updateFavouriteList() {

    // }

    // getHistoryList() {
    //     each(this.books, (b: any) => {
    //         if (b.favourite) {
    //             this.favourites.push(b);
    //         }
    //     });
    // }

    // add() {
    //     this.dialog.open(DialogComponent).afterClosed().subscribe((v) => {
    //         let url = '/api/namespaces';
    //         console.log(v); // undefined?
    //         if ( v.id ) {
    //             url = `${url}/${v.id}`;
    //         }
    //         this.http.post(url, {
    //             name: v.name,
    //             short: v.short,
    //             description: v.description
    //         }).subscribe((namespace) => {
    //             if ( !v.id ) {
    //                 // this.list.push(v);
    //                 this.books.push(v);
    //             }
    //         });
    //     });
    // }

    // edit(namespace: any) {
    //     this.dialog.open(DialogComponent, { data: namespace });
    // }

    // ngOnDestroy() {
    //     this.media$.unsubscribe();
    // }

    // onCategoryChange(id: number) {
    //     console.log(id);
    //     if (id === null) {
    //         this.books = cloneDeep(this.allBooks);
    //     } else {
    //         this.books = filter(this.allBooks, (o) => o.category === this.categories[id].id);
    //     }
    // }

    // saveFavorite(book: any, i: number) {
    //     this.books[i].favorite = true;
    // }

    // removeFavorite(book: any, i: number) {
    //     this.books[i].favorite = false;
    // }

    // openBook(book: any) {
    //     alert('open book ' + book.name);

    //     this._router.navigate(compact([
    //         book.id,
    //         book.id,
    //         book.id
    //       ]), { fragment: 'text' });
    // }

    // removeBook(book: any, i: number) {
    //     // call remove api
    //     this.allBooks = filter(this.allBooks, (o) => o.id !== i);
    // }
}
