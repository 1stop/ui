import { Component, OnInit, Input, ElementRef, SimpleChanges,
         Output, EventEmitter, OnChanges } from '@angular/core';
import { Subject, Subscription, Observable, merge } from 'rxjs';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { isEmpty, get, set } from 'lodash';
import { debounceTime, distinct } from 'rxjs/operators';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit, OnChanges {
  change: Subject<any> = new Subject<any>();
  save: Subject<any> = new Subject<any>();

  change$: Subscription;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Input() content: any;

  separatorKeysCodes = [ENTER, COMMA, SPACE];
  cache: any = {};

  constructor(private el: ElementRef,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.change$ = merge(
        this.change.pipe(debounceTime(1000)),
        this.save
    ).pipe(
      distinct((v: any) => {
        return `${v.id}${v.text}${get(v, 'tags', []).join('')}`;
      })
    ).subscribe((v) => {
      this._save(v.id, v.text, v.tags);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( !isEmpty(this.cache) ) {
      this.save.next(this.cache);
    }
  }

  _save(id: string, text: string, tags: string[]) {
    // this._list
    //   .saveText(id, text, tags)
    //   .subscribe(() => {
    //     this.cache = {};
    //     this.update.emit({ id: id, text: text, tag: tags });
    //   });
  }

  edit() {
    this.cache = {
      text: get(this.content, 'data.text' , ''),
      tags: get(this.content, 'data.tag' , []),
      id: this.content.id
    };

    this.change.next(this.cache);
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    const tags = get(this.content, 'data.tag' , []);

    if ((value || '').trim()) {
      tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    set(this.content, 'data.tag', tags);
    this.edit();
  }

  removeTag(tag: any): void {
    const tags = get(this.content, 'data.tag' , []);
    const index = tags.indexOf(tag);

    if (index >= 0) {
      tags.splice(index, 1);
    }

    set(this.content, 'data.tag', tags);
    this.edit();
  }
}
