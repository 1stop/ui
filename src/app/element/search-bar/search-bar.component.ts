import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
    focus = false;
    query = '';
    @Output() search: EventEmitter<string> = new EventEmitter();

    commit() {
        this.search.emit(this.query);
    }

    clear() {
        this.query = '';
    }
}
