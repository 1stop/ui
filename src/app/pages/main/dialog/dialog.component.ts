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
  name = new FormControl('', [Validators.required]);
  short = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if ( this.data ) {
        this.name.setValue(this.data.name);
        this.short.setValue(this.data.short);
        this.description.setValue(this.data.description);
        this.short.disable();
    }
  }

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a Name': '';
  }

  submit(){
    _.every([this.name.valid, this.short.valid, this.description.valid], (f)=>{
        if (f){
            this.dialogRef.close({
                id: _.get(this.data, 'id'),
                name: this.name.value,
                short: this.short.value,
                description: this.description.value
            });
        }
    });
  }

  close(){
    this.dialogRef.close();
  }

}
