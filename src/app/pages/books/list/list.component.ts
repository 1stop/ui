import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { each, remove, find, isArray } from 'lodash';

import {MatTableModule} from '@angular/material/table';
import { debounceTime, map } from 'rxjs/operators';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { Store } from '@ngrx/store';
import * as text from '../../../state/actions/text';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

    edit$: Observable<boolean>;

    @Input() lists: any[] = [];
    change: Subject<boolean> = new Subject();
    change$: Subscription;
    @Output() highlight: EventEmitter<any> = new EventEmitter<any>();
    @Input() keyword: string;
    @Input() categoryId: string;
    @Input() selectedId: string;

    t = '';

    public completeText = '';

    constructor(private _route: ActivatedRoute, private _store: Store<any>) { }

    ngOnInit() {
      this._route.params.subscribe((params) => {
        this._store.dispatch(new text.SetCategory(params['category']));
      });

      this.edit$ = this._store.select('browser').pipe(
        map( v => v.edit)
      );

      this.change$ = this.change.pipe(
          debounceTime(1000)
        ).subscribe(() => {
        each(this.lists, (list) => {
          console.log(list);
          if (list.edit === true ) {
            // this._list.edit(this.categoryId, list.id, list.name).subscribe(() => {
            //   list.edit = false;
            // });
          }

          if (list.id === this.selectedId) {
            list = this.buildComplteText(list);
          }
        });
      });
    }

    add() {
      // this._list.create(this.categoryId, '').subscribe((v: any) => {
      //   this.lists.push(v);
      // });
    }

    edit(list: any) {
      list.edit = true;
      this.change.next(true);
    }

    delete(id: string, $event){
      // this._list.delete(this.categoryId, id).subscribe(() => {
      //   remove(this.lists, (cat) => {
      //     return cat.id === id;
      //   });
      // });
      // $event.stopPropagation();
    }

    _select(data: any){
      console.log('select');
      if ( this.selectedId !== data.id){
        this.selectedId = data.id;

        each(this.lists, (item) => {
          if (item.id === data.id) {
            item = this.buildComplteText(data);
            console.log(item);
            return false;
          }

        });


        this.highlight.emit(data);
      }
    }

    ngOnDestroy(){
      this.change$.unsubscribe();
    }

    buildComplteText(targetList) {
      let completeText = '';
      if (targetList.data && targetList.data.subtext && isArray(targetList.data.subtext)) {
        each(targetList.data.subtext, (item) => {
          completeText += item.subtext;
        });
      }
      targetList.data.text = completeText; console.log(targetList);
      return targetList;
    }
}
