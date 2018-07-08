import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { AppState } from './app.service';
import { CategoryService } from './category/category.service';
import { ListService } from './list/list.service';
import { ListComponent } from './list/list.component';
import { TextComponent } from './text/text.component';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
import { AuthService } from './services/auth.service';
import { get, findIndex } from 'lodash';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  query = '';
  searching = false;

  constructor(public state: AppState,
              private _auth: AuthService,
              public _user: UserService ) {}

  ngOnInit() {}

  @HostListener('document:keydown.escape')
  clear() {
    if ( this.query ) {
        this.state.search.next(undefined);
    }
    this.query = '';
    this.searching = false;
  }

  search() {
    this.state.search.next(this.query);
  }

  toggle() {
    this.state.edit.next(!this.state.edit.value);
  }
}
