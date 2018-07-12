import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories  = [
    { title: 1},
    { title: 3},
    { title: 2}
  ];

  edit = false;
  constructor() { }

  ngOnInit() {

  }

  add() {

  }

  // edit(category: any) {

  // }

  delete(id: string, $event) {

  }

  _select(id: string) {

  }

  ngOnDestroy() {

  }
}
