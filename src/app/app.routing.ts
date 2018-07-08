import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
// import { MainComponent } from './main/main.component';
import { AuthService } from './services/auth.service';

export const appRoutes: Routes = [
  // { path: '', component: MainComponent },
  { path: ':ns', component: ContentComponent, data: { reuse: true }/*, canActivate: [AuthService]*/},
  { path: ':ns/:categoryId', component: ContentComponent, data: { reuse: true }/*, canActivate: [AuthService]()*/},
  { path: ':ns/:categoryId/:listId', component: ContentComponent, data: { reuse: true }/*, canActivate: [AuthService]*/},
];
