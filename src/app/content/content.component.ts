import { Component, ViewChild } from '@angular/core';
import { AppState } from '../app.service';
// import { CategoryService } from '../category/category.service';
// import { ListService } from '../list/list.service';
// import { ListComponent } from '../list/list.component';
// import { TextComponent } from '../text/text.component';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { get, findIndex, find, compact } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
    categories: any[] = [];
    lists: any[] = [];

    query = '';

    catId: number;
    listId: number;
    namespace: string;

    currentList: any;
    _swipe = 'category';
    sequence = 0;
    // @ViewChild('list') list: ListComponent;
    // @ViewChild('text2') text2: TextComponent;

    // constructor(public state: AppState,
    //             private _cat: CategoryService,
    //             private _list: ListService,
    //             private _auth: AuthService,
    //             private _route: ActivatedRoute,
    //             private _router: Router ) {}

    ngOnInit() {
      console.log('init');
      this.categories = [
        {
          'id': 2,
          'name': 'Occupational Safety And Health (Safety and Health Officer) (SHO) Regulation 1997'
        },
        {
          'id': 3,
          'name': 'Occupational Safety And Health (Safety and Health Committee) (SHC) Regulation 1996'
        },
        {
          'id': 4,
          'name': 'Occupational Safety And Health (Notification of Accident, Dangerous Occurrence, Occupational Poisoning and Occupational Disease) (NADOPOD) Regulations 2004'
        },
        {
          'id': 5,
          'name': 'Occupational Safety And Health (Classification, Labelling And Safety Data Sheet Of Hazardous Chemicals) (CLASS) Regulations 2013'
        },
        {
          'id': 6,
          'name': 'Occupational Safety And Health Act (OSHA) 1994'
        },
        {
          'id': 7,
          'name': 'Occupational Safety And Health (Use And Standards Of Exposure Of Chemicals Hazardous To Health) (USECHH) Regulations 2000'
        },
        {
          'id': 8,
          'name': 'Occupational Safety And Health (Control Of Industrial Major Accident Hazards) (CIMAH) Regulations 1996'
        },
        {
          'id': 9,
          'name': 'Occupational Safety And Health (Employers\' Safety And Health General Policy Statements) (Exception) Regulations 1995'
        },
        {
          'id': 10,
          'name': 'Environmental Quality Act (EQA), 1974'
        },
        {
          'id': 11,
          'name': 'Environmental Quality (Scheduled Wastes) (SW) Regulations 2005'
        },
        {
          'id': 12,
          'name': 'Factories And Machinery Act(FMA)  1967 (Revised - 1974) '
        }
      ];
    }
    //   this._route.params.subscribe((param) => {
    //     console.log(param);
    //     if ( this.namespace !== param.ns ) {
    //       this.namespace = param.ns;

    //       this.state.load.next(true);
    //       console.log('load');
    //       this._cat.list(this.query).subscribe((v: any[]) => {
    //         console.log(v);
    //         this.state.load.next(false);
    //         // this.categories = v['data'] || [];
    //         // this.categories = v;
    //         // console.log('category', v);

    //         // if( v.length != 0){
    //         //   if ( findIndex(v, {'id': this.catId}) === -1 ) {
    //         //     this.catId = v[0].id
    //         //   }
    //         //   this.list_refresh(this.catId);
    //         // } else {
    //         //   this.catId = undefined;
    //         // }
    //       });
    //     }


    //     if ( this.catId !== +param.categoryId ) {
    //         this.catId = +param.categoryId;
    //         this.state.load.next(true); console.log(this.query);
    //         this._list.list(this.catId || 1, this.query).subscribe((v: any[]) => {
    //           this.state.load.next(false);
    //           this.lists = v;
    //           if ( v.length !== 0){
    //             const data = find(v, { id: this.listId });
    //             if ( !data || this.listId === undefined){
    //                 this.listId = v[0].id;
    //                 setTimeout(() => {
    //                     this.text_refresh(v[0]);
    //                 });
    //             } else {
    //                 this.currentList = data;
    //             }
    //           } else {
    //             this.listId = undefined;
    //           }
    //         });
    //     }

    //     if ( this.listId !== +param.listId ) {
    //       this.listId = +param.listId;
    //     }
    //   });

    //   this._route.fragment.subscribe((v: string) => {
    //     this._swipe = v;
    //   });

    //   this.state.search.pipe(skip(1)).subscribe((q: string) => {
    //     this.query = q;
    //     this.search();
    //   });
    // }

    // list_refresh(id: number, clear = false ) {
    //   if ( this.catId === id) {
    //     return;
    //   }

    //   if ( clear ) {
    //     this.listId = undefined;
    //     this.currentList = undefined;
    //   }
    //   const urls: string[] = compact([
    //         this.namespace,
    //         id,
    //         this.listId
    //     ]);

    //   this._router.navigate(urls, { fragment: 'list', skipLocationChange: urls.length === 3 ? false : true});
    // }

    // text_refresh(data: any, force: boolean = false) {
    //   console.log('text refresh', data);
    //   this.currentList = data;
    //   this._router.navigate(compact([
    //     this.namespace,
    //     this.catId,
    //     data.id
    //   ]), { fragment: 'text' });
    // }

    // update($event: any){
    //   console.log('update');
    //   const ind = findIndex(this.lists, (list: any) => {
    //     return list.id === $event.id;
    //   });

    //   if ( ind !== undefined ){
    //     this.lists[ind].data.tag = $event.tag;
    //     this.lists[ind].data.text = $event.text;
    //   }
    // }

    // search() {
    //   this.sequence = 0;
    //   this.state.load.next(true);
    //   this._cat.list(this.query).subscribe((v: any[]) => {
    //     this.state.load.next(false);
    //     this.categories = v;
    //     if ( v.length !== 0) {
    //       if ( findIndex(v, {'id': this.catId}) === -1 ) {
    //         this.catId = v[0].id;
    //       }
    //       this.list_refresh(this.catId);
    //     } else {
    //       this.catId = undefined;
    //     }
    //   });
    // }

    // clear() {
    //   this.query = '';
    //   this._cat.list().subscribe((v: any[]) => {
    //     this.categories = v;
    //     if ( v.length !== 0) {
    //       this.catId = v[0].id;
    //       this.list_refresh(this.catId);
    //     }
    //   });
    // }

    // filterSwipe(swipe: string ): string {
    //   const allCat = ['text', 'category', 'list'];
    //   if ( allCat.indexOf(swipe) !== -1 ) {
    //     return swipe;
    //   } else {
    //       return 'category';
    //   }
    // }

    // swipe(target: string ) {
    //   this._router.navigate([
    //     this.namespace,
    //     this.catId,
    //     this.listId
    //   ], { fragment: target });
    // }
}
