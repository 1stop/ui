import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextEditorComponent } from './text-editor.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [
        TextEditorComponent
    ],
    exports: [
        TextEditorComponent
    ]
})
export class TextEditorModule {}
