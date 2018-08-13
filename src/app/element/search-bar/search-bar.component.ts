import { Component, ViewChild, OnInit, ElementRef, Input, HostListener } from '@angular/core';
import { SearchService } from './search-bar.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
    focus = false;
    query = '';
    @Input() shouldFocus = false;
    @Input() placeholder: string;
    @ViewChild('input') searchbar: ElementRef;

    constructor(private _s: SearchService,
                private _route: ActivatedRoute) { }

    ngOnInit() {
        if ( this.shouldFocus ) {
            this.searchbar.nativeElement.focus();
        }

        this._route.queryParams.pipe(
            take(2)
        ).subscribe((q) => {
            this.query = q['query'];
        });
    }

    commit() {
        this._s.search.next(this.query);
    }

    @HostListener('document:keydown.escape')
    clear() {
        if ( this.query ) {
            this._s.search.next(null);
            this.query = '';
        }
    }
}
