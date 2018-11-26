import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextEditorComponent } from './text-editor.component';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
    imports: [
        EditorModule,
        FlexLayoutModule,
        FormsModule,
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
