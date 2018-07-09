import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { DialogComponent } from './dialog/dialog.component';
import { RouterModule } from '@angular/router';
import { SearchBarModule } from '../../element/search-bar/search-bar.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatCardModule, MatIconModule } from '@angular/material';

@NgModule({
    declarations: [
        MainComponent,
        DialogComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: MainComponent }
        ]),
        SearchBarModule,
        FlexLayoutModule,
        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule
    ],
    providers: [],
    entryComponents: [
        DialogComponent
    ]
})
export class MainModule {}
