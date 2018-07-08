import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchBarComponent } from './search-bar.component';
import { MatIconModule, MatButton, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatIconModule,
        CommonModule,
        FormsModule,
        MatButtonModule
    ],
    declarations: [
        SearchBarComponent
    ],
    exports: [
        SearchBarComponent
    ]
})
export class SearchBarModule {}
