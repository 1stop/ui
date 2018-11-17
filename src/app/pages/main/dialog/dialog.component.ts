import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import every from 'lodash-es/every';
import get from 'lodash-es/get';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  id: string;
  title = new FormControl('', [Validators.required]);
  short = new FormControl('', [Validators.required]);
  background: string;
  uploading = false;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    if ( this.data ) {
        this.id = this.data.id;
        this.title.setValue(this.data.title);
        this.short.setValue(this.data.short || 'n/a');
        this.short.disable();
    }
  }

  getErrorMessage() {
    return this.title.hasError('required') ? 'You must enter a Title' : '';
  }

  upload($event) {
    this.uploading = true;
    const blob = $event.target.files[0];
    const filePath = `${Math.random().toString(36).substr(2, 5)}_${blob.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, blob);
    task.snapshotChanges().pipe(
        finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
                this.uploading = false;
                this.background = url;
            });
        })
      )
    .subscribe();
  }

  submit() {
    every([this.title.valid, this.short.valid], (f) => {
        if (f) {
            this.dialogRef.close({
                id: get(this.data, 'id'),
                title: this.title.value,
                short: this.short.value,
                background: this.background
            });
        }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
