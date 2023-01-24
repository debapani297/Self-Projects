
import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';

import{MatInputModule} from '@angular/material/input'
import{MatButtonModule} from '@angular/material/button'
import{MatToolbarModule} from '@angular/material/toolbar'
import{ MatCardModule} from '@angular/material/card'
import{MatDialogModule} from '@angular/material/dialog'
import{MatTableModule} from '@angular/material/table'
import{MatMenuModule} from '@angular/material/menu'
import{MatIconModule} from '@angular/material/icon'
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import{MatSidenavModule} from '@angular/material/sidenav'
import{MatListModule} from '@angular/material/list'
import {  MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import{MatDatepickerModule} from "@angular/material/datepicker";
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSortModule } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import {LiveAnnouncer} from '@angular/cdk/a11y';








@NgModule({
  imports: [
  CommonModule, 
  MatToolbarModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatDatepickerModule,
  MatRadioModule,
  MatNativeDateModule,
  MatDividerModule,
  MatFormFieldModule,
  FlexLayoutModule,
  MatSortModule,
  // MatTableDataSource,
  // LiveAnnouncer
  
  
 
  
  ],
  exports: [
  CommonModule,
   MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatSidenavModule,
   MatListModule,
   MatOptionModule,
   MatSelectModule,
   MatDatepickerModule,
   MatRadioModule,
   MatNativeDateModule,
   MatDividerModule,
   MatFormFieldModule,
   FlexLayoutModule,
  //  MatTableDataSource

   
  
   ],
})


export class CustomMaterialModule {

}
