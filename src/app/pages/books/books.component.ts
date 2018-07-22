import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as browser from '../../state/actions/browser';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
    editMode$: Observable<any>;

    constructor(public _store: Store<any>,
                public _user: UserService) {}

    listId = 1;

    ngOnInit() {
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
    }
}
