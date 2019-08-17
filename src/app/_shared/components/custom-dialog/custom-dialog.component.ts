import {Component, Inject, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DialogData } from '../../models/util';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})

export class CustomDialogComponent {
  onConfirm = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<CustomDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  onConfirmClick(): void {
    this.dialogRef.close();
    this.onConfirm.emit();
  }
}
