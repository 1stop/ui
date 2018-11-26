import { Component, Input, OnInit, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
// import 'tui-editor/dist/tui-editor.css'; // editor ui
// import 'tui-editor/dist/tui-editor-contents.css'; // editor content
// import 'tui-editor/dist/tui-editor-extTable.js';
// import Editor from 'tui-editor/dist/tui-editor-Editor';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { EditorModule } from '@tinymce/tinymce-angular';
import cloneDeep from 'lodash-es/cloneDeep';

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
        // autoresize_on_init: true,
        // autoresize_bottom_margin: 50,
        /*images_upload_handler: function (blobInfo, success, failure) {

            var xhr, formData;
        
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', 'postAcceptor.php');
        
            xhr.onload = function() {
              var json;
        
              if (xhr.status != 200) {
                failure('HTTP Error: ' + xhr.status);
                return;
              }
        
              json = JSON.parse(xhr.responseText);
        
              if (!json || typeof json.location != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
              }
        
              success(json.location);
            };
        
            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
        
            xhr.send(formData);
          }*/
    };

    // constructor(public _myElement: ElementRef,
    //             private storage: AngularFireStorage) {}

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
}
