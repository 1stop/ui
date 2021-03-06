import { Component, OnInit, Input,
         Output, EventEmitter, PLATFORM_ID, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject, Subscription, Observable, combineLatest, of } from 'rxjs';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material';
import { map, filter, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as text from '../../../state/actions/text';
import { Text } from '../../../model/text';
import { BooksService } from './../books.service';
import { UserService } from '../../../services/user.service';
import { ReportTextDialogComponent } from './report-text-dialog/report-text-dialog.component';
import each from 'lodash-es/each';
import get from 'lodash-es/get';
import join from 'lodash-es/join';
import { isPlatformServer } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  change: Subject<any> = new Subject<any>();

  change$: Subscription;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Input() content: any;

  separatorKeysCodes = [ENTER, COMMA, SPACE];
  cache: any = {};

  text = ``;
  texts = [];
  edit$: Observable<boolean>;

  namespace: number;
  category: number;
  lst_id: number;

  constructor(public snackBar: MatSnackBar,
              private _store: Store<any>,
              private _route: ActivatedRoute,
              private _http: HttpClient,
              private _router: Router,
              private _books: BooksService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private _title: Title,
              private _meta: Meta,
              private _dialog: MatDialog,
              public _user: UserService ) { }

  ngOnInit() {
    this.edit$ = this._store.select('browser').pipe(
      map( v => v.editMode )
    );

    combineLatest(
      this._route.params,
      this._store.select('text')).pipe(
      filter(([params, state]) => state.category)
    ).subscribe(([params, state]) => {
      this.namespace = +params['namespace'];
      this.category = +params['category'];
      this.lst_id = +params['list'];
      this.texts = []; // clear previous texts
      if ( this.lst_id ) {
        const isServer = isPlatformServer(this.platformId);
        // const isServer = true;
        //each(get(state.texts, `${state.category}.entities`), (item) => {
        each(get(state.texts, `${state.category}.ids`), (id) => {
          let item = get(state.texts, `${state.category}.entities[${id}]`, null);
          //if ( item.text !== '' ) {
          if (item) {
            if ( item.id === this.lst_id ) {
              this._title.setTitle(`${item.title}| ProAToZ`);
              this._meta.updateTag({
                name: 'description',
                content: item.text.replace(/<[^>]*>/g, ''),
              });
              this._meta.updateTag({
                name: 'keywords',
                content: join(item.tags, ',')
              });
            }

            if ( isServer
                 && item.id === this.lst_id) {
              this.texts.push(item);
              return false;
            }

            if (!isServer) {
              this.texts.push(item);
            }
          }
        });

        setTimeout(()=>{
          this._books.triggerScrollTo(this.lst_id);
        });
        this.text = get(state.texts, `${state.category}.entities.${this.lst_id}.text`, '');
      }
    });
  }

  save() {
    of(null).pipe(
      withLatestFrom(this._store.select('text'))
    ).subscribe(([_, state]) => {
      const txt = state.texts[state.category].entities[this.lst_id];
      this._http.put(`/api/texts/${this.lst_id}`, {
        category: state.category,
        title: txt.title,
        text: this.text
      }).subscribe((v: {data: Text}) => {
        this._store.dispatch(new text.Update(state.category, <any>v.data));
        this.openSnackBar('Saved!');
      });
    });
  }

  handleClick($event) {
    const tag = get($event, 'target.tagName');
    if ( tag === 'A') {
      const href = get($event, 'target.href', '');
      if ( href.indexOf(window.location.origin) !== -1) {
        const url = href.replace(window.location.origin, '');
        this._router.navigateByUrl(url);
        $event.preventDefault();
      }
    }
  }

  updateText(text) {
    this.text = text;
  }

  copyText(item) {
    let doc = new DOMParser().parseFromString(item.text || '', 'text/html');
    var text = doc.body.textContent;

    let el = document.createElement('textarea');
    el.value = `${item.title}\n${text}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    this.openSnackBar('Text copied!');
  }

  openReportDialog(id, title) {
    this._dialog.open(ReportTextDialogComponent, {
      data: {
        id: id, 
        title: title
      }
    }).afterClosed().subscribe((data) => {
      if ( data && data.id && data.message ) {
        this._http.post('/api/reports', {
          text: data.id,
          message: data.message,
        }).subscribe(()=>{
          this.openSnackBar('Report Submitted');
        });
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 1500,
    });
  }
}