import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppState } from '../app.service';
import { CategoryService } from './category.service';
import { Subscription, Subject } from 'rxjs';
import { each, remove } from 'lodash';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() categories: any[] = [];
  change: Subject<boolean> = new Subject();
  change$: Subscription;
  @Output() select: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedId: string;

  t: string = "";

  constructor(public state:AppState,
              private _cat: CategoryService) { }

  ngOnInit() {
    this.change$ = this.change.debounceTime(1000).subscribe(()=>{
      console.log(this.categories);
      each(this.categories, (cat)=>{
        if (cat.edit === true ){
          this._cat.edit(cat.id, cat.name).subscribe(()=>{
            cat.edit = false;
          });
        }
      })
    });
  }

  add(){
    this._cat.create("").subscribe((v: any)=>{
      this.categories.push(v);
    });
  }

  edit(category: any){
    category.edit = true;
    this.change.next(true);
  }

  delete(id: string, $event){
    this._cat.delete(id).subscribe(()=>{
      remove(this.categories, (cat)=>{
        return cat.id === id;
      });
    });
    $event.stopPropagation();
  }

  _select(id: string){
    console.log('select');
    this.selectedId = id;
    this.select.emit(this.selectedId);
  }

  ngOnDestroy(){
    this.change$.unsubscribe();
  }
}
