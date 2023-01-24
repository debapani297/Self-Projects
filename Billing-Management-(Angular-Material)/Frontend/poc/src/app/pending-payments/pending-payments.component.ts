import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { PaymentDisplay } from '../model/dto/payment-display';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-pending-payments',
  templateUrl: './pending-payments.component.html',
  styleUrls: ['./pending-payments.component.css']
})
export class PendingPaymentsComponent implements OnInit {
  pendingDisplay:PaymentDisplay[]=[]
  commonResponse:CommonResponse={
    response: undefined,
    statusCode: 0
  }
  commonResponse1:CommonResponse={
    response: undefined,
    statusCode: 0
  }
  companyId=sessionStorage.getItem('companyId')
  userId=sessionStorage.getItem('userId')
  displayedColumns: string[] = ['paymentId','dueDate','amount','invoiceId','contractId','client','vendor','status'];
  dataSource = this.pendingDisplay;
  empty: boolean=false;
  errorMessage='';

  constructor(public service:LogInServiceService,private matDialog:MatDialog,private bkService:backendService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    if(this.service.isAP()){
      this.displayedColumns=['paymentId','dueDate','amount','invoiceId','contractId','client','vendor','status','action',];

    }
    this.bkService.getPendingPayments(this.companyId).subscribe(
      response=>{this.commonResponse=response
      console.log(this.commonResponse.response)
      if(this.commonResponse.statusCode===200){
        this.pendingDisplay=this.commonResponse.response
      }
      else  if(this.commonResponse.statusCode===404){
        this.empty=true
        this.errorMessage=this.commonResponse.response
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
this.bkService.pay(element.paymentId,this.userId).subscribe(
  response=>{
    this.commonResponse1=response
    if(this.commonResponse1.statusCode===201){
      this.matDialog.open(DialogBoxComponent,{
        data:"Payment done Successfully"
      })
      this.refresh();
    }
    else{
      this.matDialog.open(DialogErrorComponent,{
        data:"Payment Failed. Please try again!"
      })
      this.refresh();
    }
  }
)
  }
}
