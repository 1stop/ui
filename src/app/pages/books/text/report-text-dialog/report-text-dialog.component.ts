import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'report-text-dialog',
  templateUrl: './report-text-dialog.component.html'
})
export class ReportTextDialogComponent implements OnInit {
    
    textId: string;
    // textTitle: string;
    // message: FormControl = new FormControl();
    msg: string = '';

  constructor(
    public dialogRef: MatDialogRef<ReportTextDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if ( this.data ) {
        this.textId = this.data.id;
    }
  }

  submit() {
    this.dialogRef.close({
        id: this.textId,
        message: this.msg
    });
  }
}
