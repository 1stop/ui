import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { DialogComponent } from './dialog/dialog.component';
import { RouterModule } from '@angular/router';
import { SearchBarModule } from '../../element/search-bar/search-bar.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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
        FlexLayoutModule
    ],
    providers: [],
    entryComponents: [
        DialogComponent
    ]
})
export class MainModule {}
