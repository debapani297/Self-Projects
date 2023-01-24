import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { InvoiceDisplay } from '../model/dto/invoice-display';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-pending-invoice',
  templateUrl: './pending-invoice.component.html',
  styleUrls: ['./pending-invoice.component.css']
})
export class PendingInvoiceComponent implements OnInit {
  companyId=sessionStorage.getItem('companyId');
  commonResponse:CommonResponse={
    response: undefined,
    statusCode: 0
  }
  commonResponse1:CommonResponse={
    response: undefined,
    statusCode: 0
  }
  empty:boolean=false;
  errorMessage='';
  invoiceDisplay:InvoiceDisplay[]=[]
  userId=sessionStorage.getItem('userId')
  constructor(private bkservice:backendService,private matDialog:MatDialog,public service:LogInServiceService) { }
  displayedColumns: string[] = ['invoiceId','contractId','companyVendor','companyClient','invoiceAmount','dueDate','invoiceRaisedBy','status'];
  dataSource = this.invoiceDisplay;
  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    if(this.service.isCPM() ){
      this.displayedColumns=['invoiceId','contractId','companyVendor','companyClient','invoiceAmount','dueDate','invoiceRaisedBy','status','action'];
    }
    this.bkservice.getPendingInvoice(this.companyId).subscribe(
      response=>{ console.log(response)
        this.commonResponse=response
      console.log(this.commonResponse)
      if(this.commonResponse.statusCode===200){
this.invoiceDisplay=this.commonResponse.response

      }else if (this.commonResponse.statusCode===404){
        this.empty=true;
        this.errorMessage=this.commonResponse.response;
      }
      else{
        this.matDialog.open(DialogErrorComponent,{
          data:this.commonResponse.response
        })
      }
      }
    )
  }

  changeStatus(element:any){
    console.log(this.userId);
this.bkservice.updateInvoiceStatus(element.invoiceId,this.userId).subscribe(
  response=>{
    this.commonResponse1=response
    console.log(this.commonResponse1.response.statusCode)
    if(this.commonResponse1.statusCode===201){
     
      this.matDialog.open(DialogBoxComponent,{
        data:"Invoice accepted! Sent to Client Contract Manager for approval"
      })
      this.refresh();
    }
    else{
      this.matDialog.open(DialogErrorComponent,{
        data:this.commonResponse1.response + " Please try again!"
      })
    }
  }
)
  }
}
