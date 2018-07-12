import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as browser from '../../state/actions/browser';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
    constructor(public _store: Store<any>) {}

    ngOnInit() {
        this._store.dispatch( new browser.SearchOn());
    }

}
