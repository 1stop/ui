import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule, MatIconModule, MatToolbarModule,
         MatButtonModule, MatChipsModule,
         MatFormFieldModule, MatSnackBarModule,
         MatProgressSpinnerModule, MatSidenavModule, MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';

import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

import { AppState } from './app.service';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { Autosize } from 'ng-autosize/src/autosize.directive';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire';

import * as Raven from 'raven-js';
import { SplitAreaDirective } from './directive/split/split-area.directive';
import { SplitHandlerDirective } from './directive/split/split-handler.directive';
import { SplitDirective } from './directive/split/split.directive';
import { StipMarkdownPipe } from './pipe/stip-markdown.pipe';
import { HighlightPipe } from './pipe/highlight.pipe';
import { ExcerptPipe } from './pipe/excerpt.pipe';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ContentComponent } from './content/content.component';

import { appRoutes } from './app.routing';
// import { MainComponent } from './main/main.component';
// import { DialogComponent } from './main/dialog/dialog.component';
import { CustomRouteReuseStrategy } from './router-strategy';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService, UserDetailsComponent } from './services/user.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainModule } from './pages/main/main.module';
import { LoginDialogModule } from './login/login.module';
import { browserReducer } from './state/reducer/browser';
import { StoreModule } from '@ngrx/store';
import { SearchBarModule } from './element/search-bar/search-bar.module';
import { BooksModule } from './pages/books/books.module';
import { EffectsModule } from '@ngrx/effects';
import { AvatarComponent } from './element/avatar/avatar.component';
import { FirebaseInterceptor } from './services/http-interceptor.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SearchService } from './element/search-bar/search-bar.service';
import { ORIGIN_HOST } from './app.token';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = {
       pan: {
           direction: 6
       },
       pinch: {
           enable: false
       },
       rotate: {
           enable: false
       }
   };

}


if ( environment.production ) {
  Raven
    .config('https://b91dde0b546c45008931c588e63de99c@sentry.io/272501')
    .install();
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    if ( environment.production ) {
      Raven.captureException(err.originalError || err);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    // CategoryComponent,
    ContentComponent,
    Autosize,
    // SplitAreaDirective,
    // SplitHandlerDirective,
    // SplitDirective,
    StipMarkdownPipe,
    HighlightPipe,
    // ExcerptPipe,
    // MainComponent,
    // DialogComponent,
    AvatarComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forRoot( appRoutes, {
      // enableTracing: !environment.production
      enableTracing: false
    }),
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    CommonModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatDividerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    StoreModule.forRoot({ browser: browserReducer}),
    EffectsModule.forRoot([]),
    SearchBarModule,
    LoginDialogModule,
    MainModule,
    BooksModule,
    MatTooltipModule
  ],
  providers: [
    AppState,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FirebaseInterceptor,
      multi: true
    },
    AuthService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    },
    {
      provide: ORIGIN_HOST,
      useValue: environment.base_url
    },
    SearchService,
    ScrollToService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UserDetailsComponent
  ]
})
export class AppModule { }
