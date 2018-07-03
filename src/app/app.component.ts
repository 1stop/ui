import { Component, ViewChild, HostListener } from '@angular/core';
import { AppState } from './app.service';
import { CategoryService } from './category/category.service';
import { ListService } from './list/list.service';
import { ListComponent } from './list/list.component';
import { TextComponent } from './text/text.component';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
import { AuthService } from './services/auth.service';
import { get, findIndex } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;
  query: string = "";
  searching: boolean = false;

  constructor(public state: AppState,
              private _auth: AuthService){}

  ngOnInit(){
    var config = {
      apiKey: "AIzaSyA1Xia725799awT7BTMZBVDQN0EW09VDRA",
      authDomain: "osha-b65ae.firebaseapp.com",
      databaseURL: "https://osha-b65ae.firebaseio.com",
      projectId: "osha-b65ae",
      storageBucket: "osha-b65ae.appspot.com",
      messagingSenderId: "536860153158"
    };
    firebase.initializeApp(config);
    this._auth.authStatus().subscribe((user)=> {
        this.user = user;
        this.state.load_user(user);
    });
  }

  @HostListener('document:keydown.escape')
  clear(){
    if ( this.query ){
        this.state.search.next(undefined);
    }
    this.query = '';
    this.searching = false;
  }

  search(){
    this.state.search.next(this.query);
  }

  login(){
    this._auth.loginWithGoogle().subscribe((user)=>{
        this.user = user;
    });
  }

  toggle(){
    this.state.edit.next(!this.state.edit.value);
  }
}
