import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  constructor(
    @Inject (MAT_DIALOG_DATA) public message:any,
    private dialogRef:MatDialogRef<DialogBoxComponent>) { }

    // dialogForm=new FormGroup({
    //   successMessage:new FormControl(this.message)
    // })
  ngOnInit(): void {
  }

}
