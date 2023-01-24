import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.css']
})
export class DialogErrorComponent implements OnInit {

  constructor( @Inject (MAT_DIALOG_DATA) public message:any,
  private dialogRef:MatDialogRef<DialogErrorComponent>) { }

  ngOnInit(): void {
  }

}