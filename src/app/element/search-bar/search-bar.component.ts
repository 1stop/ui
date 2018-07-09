import { Component, EventEmitter, Output, ViewChild, OnInit, ElementRef, Input } from '@angular/core';

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
    @Output() search: EventEmitter<string> = new EventEmitter();
    @ViewChild('input') searchbar: ElementRef;

    ngOnInit() {
        if ( this.shouldFocus ) {
            this.searchbar.nativeElement.focus();
        }
    }

    commit() {
        this.search.emit(this.query);
    }

    clear() {
        this.query = '';
    }
}
