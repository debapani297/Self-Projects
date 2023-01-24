import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { Contracts } from '../model/Contracts';
//import { Invoice } from '../model/Invoice';
import { backendService } from '../service/backendservice';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
//import { ContractModel } from '../Models/contract-model';
import { CommonResponse } from '../model/CommonResponse';
import { InvoiceRaisingDto } from '../model/dto/invoice-raising-dto';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
@Component({
  selector: 'app-invoice-creation',
  templateUrl: './invoice-creation.component.html',
  styleUrls: ['./invoice-creation.component.css']
})
export class InvoiceCreationComponent implements OnInit {

  clientName='';
  user=sessionStorage.getItem('authUser');
  client:[]=[];
 commonResponse:CommonResponse={
   response: undefined,
   statusCode: 0
 }

 commonResponse1:CommonResponse={
  response: undefined,
  statusCode: 0
}
today=new Date();
  invoiceDetails=new FormGroup({
    invoiceCreationDate:new FormControl(new Date(),[Validators.required]),
    invoiceAmount:new FormControl('',[Validators.required]),
    dueDate:new FormControl('',[Validators.required]),
    contractNumber:new FormControl('',[Validators.required]),
    invoiceBillingTo:new FormControl('',[Validators.required]),
    invoiceRaisedBy:new FormControl(sessionStorage.getItem('authUser'),[Validators.required]),
    invoiceRaisedByCompany:new FormControl('',[Validators.required]),
    invoiceRaisedById:new FormControl(sessionStorage.getItem('userId'))
  });

invoiceDto:InvoiceRaisingDto={
  companyVendor: 0,
  companyClient: 0,
  contractRaisedby: 0,
  contractApprovedByCPM: 0,
  contractApprovedByCCM: 0,
  fromDate: new Date,
  toDate: new Date,
  amount: 0,
  status: '',
  contractId: 0
}
  constructor(private backendService:backendService,
    private router:Router,
    private http:HttpClient,
    private matDialog:MatDialog,
    @Inject (MAT_DIALOG_DATA) public invoiceData:any,
    private dialogRef:MatDialogRef<InvoiceCreationComponent>) { }

  ngOnInit(): void {
    console.log(this.invoiceData);
    if(this.invoiceData){
      //this.invoiceDetails.controls['invoiceRaisedBy'].setValue(this.invoiceData.companyVendor);
      this.invoiceDetails.controls['contractNumber'].setValue(this.invoiceData.contractId);
      this.invoiceDetails.controls['invoiceBillingTo'].setValue(this.invoiceData.companyClient);
      this.invoiceDetails.controls['invoiceRaisedByCompany'].setValue(this.invoiceData.companyVendor);
      
      
    }
    this.backendService.getContractByContractId(this.invoiceData.contractId).subscribe(
      response=>{this.commonResponse=response
        if(this.commonResponse.statusCode===200)
      console.log(this.commonResponse.response)
    }
    )
  }


 
      previousPage(){
        this.router.navigate(['welcomeAccountReceivable',sessionStorage.getItem('authUser')]);
          }
      invoiceCreation(){

        
        console.log(this.invoiceDetails.value);
        this.invoiceDto.companyVendor=this.commonResponse.response.companyVendor.companyId
        this.invoiceDto.companyClient=this.commonResponse.response.companyClient.companyId
        this.invoiceDto.contractId=this.commonResponse.response.contractId
        this.invoiceDto.contractRaisedby=this.invoiceDetails.get('invoiceRaisedById')?.value
        this.invoiceDto.amount=this.invoiceDetails.get('invoiceAmount')?.value
        this.invoiceDto.fromDate=this.invoiceDetails.get('invoiceCreationDate')?.value
        this.invoiceDto.fromDate=this.invoiceDetails.get('dueDate')?.value
console.log(this.today.getDate);
        if(this.invoiceDetails.get('invoiceAmount')?.value>this.invoiceData.balance){
          this.matDialog.open(DialogErrorComponent,{
            data:"Invoice amount can't be greater than contract balance amount"
          })
        }
        else if(this.invoiceDetails.get('dueDate')?.value < this.invoiceDetails.get('invoiceCreationDate')?.value){
          this.matDialog.open(DialogErrorComponent,{
            data:"due date can't be in past!"
          })
        }
        else{

        this.backendService.addInvoice(this.invoiceDto).subscribe(
          response=>{
            this.commonResponse1=response
            if(this.commonResponse1.statusCode===201){
             this.matDialog.open(DialogBoxComponent,{
               data:"Invoice Created Successfully"
             })
            }
            else {
              this.matDialog.open(DialogErrorComponent,{
                data:"Failed to raise Invoice :("
              })
            }
          }
        )
       
        this.dialogRef.close();

      }

        // this.invoiceDetails.reset();
        
         

        }

}
