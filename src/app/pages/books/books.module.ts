import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { BooksService } from './books.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryComponent } from './category/category.component';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatListModule, MatChipsModule, MatFormFieldModule, MatTabsModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SplitModule } from '../../directive/split/split.module';
import { ListComponent } from './list/list.component';
import { TextComponent } from './text/text.component';
import { ReportTextDialogComponent } from './text/report-text-dialog/report-text-dialog.component';
import { StoreModule } from '@ngrx/store';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { categoryReducer } from '../../state/reducer/category';
import { namespaceReducer } from '../../state/reducer/namespace';
import { textReducer } from '../../state/reducer/text';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from '../../state/effects/category';
import { TextEffects } from '../../state/effects/text';
import { TextEditorModule } from '../../element/text-editor/text-editor.module';
import { NamespaceEffects } from '../../state/effects/namespace';
import { SafehtmlPipe } from './../../pipe/safehtml.pipe';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'books/:namespace', component: BooksComponent },
            {
                path: 'books/:namespace/:category',
                component: BooksComponent,
                data: { reuse: true }
            },
            {
                path: 'books/:namespace/:category/:list',
                component: BooksComponent,
                data: { reuse: true }
            }
        ]),
        FlexLayoutModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatListModule,
        SplitModule,
        MatChipsModule,
        MatFormFieldModule,
        StoreModule.forFeature('namespace', namespaceReducer),
        StoreModule.forFeature('category', categoryReducer),
        StoreModule.forFeature('text', textReducer),
        EffectsModule.forFeature([CategoryEffects, TextEffects, NamespaceEffects]),
        TextEditorModule,
        MatTabsModule,
        MatExpansionModule,
        MatTooltipModule,
        MatInputModule
    ],
    declarations: [
        BooksComponent,
        CategoryComponent,
        ListComponent,
        TextComponent,
        SafehtmlPipe,
        ReportTextDialogComponent
    ],
    providers: [
        BooksService
    ],
    entryComponents: [
        ReportTextDialogComponent
    ]
})
export class BooksModule {}
