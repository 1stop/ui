import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  id: string;
  title = new FormControl('', [Validators.required]);
  short = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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

  submit() {
    _.every([this.title.valid, this.short.valid], (f) => {
        if (f) {
            this.dialogRef.close({
                id: _.get(this.data, 'id'),
                title: this.title.value,
                short: this.short.value
            });
        }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
