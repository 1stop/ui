import { Component, Input, OnInit, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
// import 'tui-editor/dist/tui-editor.css'; // editor ui
// import 'tui-editor/dist/tui-editor-contents.css'; // editor content
// import 'tui-editor/dist/tui-editor-extTable.js';
// import Editor from 'tui-editor/dist/tui-editor-Editor';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { EditorModule } from '@tinymce/tinymce-angular';
import cloneDeep from 'lodash-es/cloneDeep';

// import './../../../public/vendor/ckeditor/ckeditor.js';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.css', './tui-editor-contents.css', './tui-editor.css']
})
export class TextEditorComponent {
    @Input() code;
    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    // editor: any;

    text: string;

    // public readonly ckconfig = {
    //     // extraPlugins : 'autogrow'
    //     width : '100%',
    //     height: 'calc(100vh - 330px)',
    // }

    public readonly config: any = {
        height: 'calc(100vh - 330px)',
        theme: 'modern',
        // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
        plugins: ['print preview fullpage searchreplace autolink directionality advcode',
         'visualblocks visualchars fullscreen image imagetools link media template codesample code',
         'table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor',
         'wordcount contextmenu colorpicker textpattern'
        ],
        // toolbar: ['formatselect | bold italic strikethrough forecolor backcolor',
        //  'link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
        // ],
        toolbar: `undo redo | styleselect | bold italic | fontselect | fontsizeselect |
            alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image`,
        image_advtab: true,
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        templates: [
          { title: 'Test template 1', content: 'Test 1' },
          { title: 'Test template 2', content: 'Test 2' }
        ],
        content_css: [
          '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
          '//www.tinymce.com/css/codepen.min.css'
        ],
        branding: false,
        relative_urls: false,
        // autoresize_on_init: true,
        // autoresize_bottom_margin: 50,
        images_upload_handler: (blobInfo, success)=> {
            
            let blob = blobInfo.blob();
            const filePath = `${Math.random().toString(36).substr(2, 5)}_${blob.name}`;
                const fileRef = this.storage.ref(filePath);
                const task = this.storage.upload(filePath, blob);
                task.snapshotChanges().pipe(
                    finalize(() => {
                        fileRef.getDownloadURL().subscribe((url) => {
                            success(url, blob.name);
                        });
                    })
                    )
                .subscribe();
          }
    };

    constructor(public _myElement: ElementRef,
                private storage: AngularFireStorage) {}

    ngOnInit() {
        this.text = cloneDeep(this.code);

        //this.editor = Editor.factory({
            //         el: this._myElement.nativeElement,
            //         initialEditType: 'wysiwyg',
            //         previewStyle: 'vertical',
            //         height: '250px',
            //         initialValue: this.code,
            //         hideModeSwitch: true,
            //         viewer: false,
            //         exts: ['table'],
            //         usageStatistics: false,
            //         events: {
            //             'change': (v) => {
            //                 this.change.emit(this.editor.getHtml());
            //             }
            //         },
            //         hooks: {
            //             addImageBlobHook: (blob, callback) => {
            //                 const filePath = `${Math.random().toString(36).substr(2, 5)}_${blob.name}`;
            //                 const fileRef = this.storage.ref(filePath);
            //                 const task = this.storage.upload(filePath, blob);
            //                 task.snapshotChanges().pipe(
            //                     finalize(() => {
            //                         fileRef.getDownloadURL().subscribe((url) => {
            //                             callback(url, blob.name);
            //                         });
            //                     })
            //                  )
            //                 .subscribe();
            //             }
            //         }
            //     });
    }

    recordChange(change) {
        this.change.emit(change.editor.getContent());
    }

    ngOnDestroy() {
        //this.editor.remove();
        //console.log('destroy');
    }

    // onChange(change) {
    //     this.change.emit(change);
    // }
}
