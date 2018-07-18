import { Component, Input, OnInit, ElementRef } from '@angular/core';

// import '../../../public/vendor/codemirror/codemirror.css'; // codemirror
import 'tui-editor/dist/tui-editor.css'; // editor ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor content
// import '../../../public/vendor/highlight.js/github.css'; // code block highlight
import 'tui-editor/dist/tui-editor-extTable.js';

import Editor from 'tui-editor/dist/tui-editor-Editor';

@Component({
    selector: 'text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.css', './tui-editor-contents.css', './tui-editor.css']
})
export class TextEditorComponent implements OnInit {
    
    @Input() code;

    editor: any;

    constructor(public _myElement: ElementRef) {}

    ngOnInit() {
        this.editor = Editor.factory({
        //this.editor = new Editor({
            el: this._myElement.nativeElement,
            initialEditType: 'wysiwyg',
            previewStyle: 'vertical',
            height: 'auto',
            initialValue: this.code,
            hideModeSwitch: true,
            viewer: false,
            exts: ['table']
        });
    }

    save() {
        this.exit();
    }

    exit() {

    }
}