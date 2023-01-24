import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { PaymentDisplay } from '../model/dto/payment-display';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-paid-payments',
  templateUrl: './paid-payments.component.html',
  styleUrls: ['./paid-payments.component.css']
})
export class PaidPaymentsComponent implements OnInit {
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
  displayedColumns: string[] = ['paymentId','dueDate','amount','invoiceId','contractId','client','vendor','status'];
  dataSource = this.pendingDisplay;
  empty: boolean=false;
  errorMessage='';

  constructor(public service:LogInServiceService,private matDialog:MatDialog,private bkService:backendService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(){
    
    this.bkService.getPaidPayments(this.companyId).subscribe(
      response=>{this.commonResponse=response
      console.log(this.commonResponse.response)
      if(this.commonResponse.statusCode===200){
        this.pendingDisplay=this.commonResponse.response
      }
      else  if(this.commonResponse.statusCode===404){
        this.empty=true
        this.errorMessage=this.commonResponse.response
        
      }
      else {
        this.matDialog.open(DialogErrorComponent,{
          data:this.commonResponse.response
        })
      }
      }
    )

  }
}
