import { Component, Input, OnInit, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import 'tui-editor/dist/tui-editor.css'; // editor ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor content
import 'tui-editor/dist/tui-editor-extTable.js';
import Editor from 'tui-editor/dist/tui-editor-Editor';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.css', './tui-editor-contents.css', './tui-editor.css']
})
export class TextEditorComponent implements OnInit, OnDestroy {
    @Input() code;
    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    editor: any;

    constructor(public _myElement: ElementRef,
                private storage: AngularFireStorage) {}

    ngOnInit() {
        this.editor = Editor.factory({
            el: this._myElement.nativeElement,
            initialEditType: 'wysiwyg',
            previewStyle: 'vertical',
            height: '250px',
            initialValue: this.code,
            hideModeSwitch: true,
            viewer: false,
            exts: ['table'],
            usageStatistics: false,
            events: {
                'change': (v) => {
                    this.change.emit(this.editor.getHtml());
                }
            },
            hooks: {
                addImageBlobHook: (blob, callback) => {
                    const filePath = `${Math.random().toString(36).substr(2, 5)}_${blob.name}`;
                    const fileRef = this.storage.ref(filePath);
                    const task = this.storage.upload(filePath, blob);
                    task.snapshotChanges().pipe(
                        finalize(() => {
                            fileRef.getDownloadURL().subscribe((url) => {
                                callback(url, blob.name);
                            });
                        })
                     )
                    .subscribe();
                }
            }
        });
    }

    ngOnDestroy() {
        this.editor.remove();
    }
}
