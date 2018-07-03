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

import { AppState } from './app.service';

import { AppComponent } from './app.component';
import { TextComponent } from './text/text.component';
import { MarkdownModule } from 'ngx-md';
import { ListComponent } from './list/list.component';
import { CategoryComponent } from './category/category.component';

import { CategoryService } from './category/category.service';
import { ListService } from './list/list.service';
import { environment } from '../environments/environment';
import { Autosize } from 'ng-autosize/src/autosize.directive';
import { AuthService } from './services/auth.service';

import * as Raven from 'raven-js';
import { SplitAreaDirective } from './directive/split/split-area.directive';
import { SplitHandlerDirective } from './directive/split/split-handler.directive';
import { SplitDirective } from './directive/split/split.directive';
import { StipMarkdownPipe } from './pipe/stip-markdown.pipe';
import { HighlightPipe } from './pipe/highlight.pipe';
import { ExcerptPipe } from './pipe/excerpt.pipe';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ContentComponent } from './content/content.component';

import { AvatarModule } from 'ngx-avatar';
import { appRoutes } from './app.routing';
import { MainComponent } from './main/main.component';
import { DialogComponent } from './main/dialog/dialog.component';
import { CustomRouteReuseStrategy } from './router-strategy';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

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


if ( environment.production ){
  Raven
    .config('https://b91dde0b546c45008931c588e63de99c@sentry.io/272501')
    .install();
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    if ( environment.production ){
      Raven.captureException(err.originalError || err);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    ListComponent,
    CategoryComponent,
    ContentComponent,
    Autosize,
    SplitAreaDirective,
    SplitHandlerDirective,
    SplitDirective,
    StipMarkdownPipe,
    HighlightPipe,
    ExcerptPipe,
    MainComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    RouterModule.forRoot( appRoutes, {enableTracing:false}),
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    MatToolbarModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AvatarModule,
    MatSidenavModule,
    CommonModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatDividerModule
  ],
  providers: [
    AppState,
    CategoryService,
    ListService,
    // { provide: ErrorHandler, useClass: RavenErrorHandler },
    AuthService,
    {
        provide: HAMMER_GESTURE_CONFIG,
        useClass: MyHammerConfig
    },
    {
        provide: RouteReuseStrategy,
        useClass: CustomRouteReuseStrategy
    }],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent
  ]
})
export class AppModule { }
