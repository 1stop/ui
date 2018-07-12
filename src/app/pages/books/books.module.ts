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

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'books/:id', component: BooksComponent }
        ]),
        FlexLayoutModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatListModule,
        SplitModule,
        MatChipsModule,
        MatFormFieldModule
    ],
    declarations: [
        BooksComponent,
        CategoryComponent,
        ListComponent,
        TextComponent
    ]
})
export class BooksModule {}
