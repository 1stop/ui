import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryComponent } from './category/category.component';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatListModule, MatChipsModule, MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SplitModule } from '../../directive/split/split.module';
import { ListComponent } from './list/list.component';
import { TextComponent } from './text/text.component';
import { StoreModule } from '@ngrx/store';
import { categoryReducer } from '../../state/reducer/category';
import { textReducer } from '../../state/reducer/text';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from '../../state/effects/category';
import { TextEffects } from '../../state/effects/text';

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
                path: 'books/:namespace/:category/:listid',
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
        StoreModule.forFeature('category', categoryReducer),
        StoreModule.forFeature('text', textReducer),
        EffectsModule.forFeature([CategoryEffects, TextEffects])
    ],
    declarations: [
        BooksComponent,
        CategoryComponent,
        ListComponent,
        TextComponent
    ]
})
export class BooksModule {}
