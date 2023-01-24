import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { InvoiceDisplay } from '../model/dto/invoice-display';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-accepted-invoice',
  templateUrl: './accepted-invoice.component.html',
  styleUrls: ['./accepted-invoice.component.css']
})
export class AcceptedInvoiceComponent implements OnInit {
  companyId=sessionStorage.getItem('companyId');
  commonResponse:CommonResponse={
    response: undefined,
    statusCode: 0
  }
  commonResponse1:CommonResponse={
    response: undefined,
    statusCode: 0
  }
  invoiceDisplay:InvoiceDisplay[]=[]
  userId=sessionStorage.getItem('userId')
  empty: boolean=false;
  errorMessage='';
  constructor(private bkservice:backendService,private matDialog:MatDialog,public service:LogInServiceService) { }
  displayedColumns: string[] = ['invoiceId','contractId','companyVendor','companyClient','invoiceAmount','dueDate','invoiceRaisedBy','status'];
  dataSource = this.invoiceDisplay;
  ngOnInit(): void {
    this.refresh();
  }
  refresh(){
    if(this.service.isCCM() ){
      this.displayedColumns=['invoiceId','contractId','companyVendor','companyClient','invoiceAmount','dueDate','invoiceRaisedBy','status','action'];
    }
    this.bkservice.getReviewedInvoice(this.companyId).subscribe(
      response=>{ console.log(response)
        this.commonResponse=response
      console.log(this.commonResponse)
      if(this.commonResponse.statusCode===200){
this.invoiceDisplay=this.commonResponse.response

      } else  if(this.commonResponse.statusCode===404){
        this.empty=true
        this.errorMessage=this.commonResponse.response
      }else{
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
        data:"Invoice approved! Sent to Finance Team for payments processing :)"
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
