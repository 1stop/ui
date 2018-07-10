import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'books/:id', component: BooksComponent }
        ])
    ],
    declarations: [
        BooksComponent
    ]
})
export class BooksModule {}
