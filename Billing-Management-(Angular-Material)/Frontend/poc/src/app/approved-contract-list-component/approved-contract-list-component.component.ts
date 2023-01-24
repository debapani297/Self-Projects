import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { PendingContractsDto } from '../model/dto/pending-contracts-dto';
import { InvoiceCreationComponent } from '../invoice-creation/invoice-creation.component';
import { CommonResponse } from '../model/CommonResponse';
import { ContractModel } from '../model/contract-model';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';

@Component({
  selector: 'app-approved-contract-list-component',
  templateUrl: './approved-contract-list-component.component.html',
  styleUrls: ['./approved-contract-list-component.component.css']
})
export class ApprovedContractListComponent implements OnInit {
 
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  empty: boolean=false;
  constructor(public service:LogInServiceService,private bkservice:backendService,private router:Router,public matDialog:MatDialog) { }
  companyId=sessionStorage.getItem('companyId')
  approvedcontractdtoArray: PendingContractsDto[]=[];
commonResponse:CommonResponse={
  response: undefined,
  statusCode: 0
}
errorMessage="";
displayedColumns: string[] = ['contractId','companyVendor','companyClient','amount','contractRaisedBy','fromDate','toDate','status','balance','Action'];
dataSource = this.approvedcontractdtoArray;

approvedContracts:ContractModel[]=[]
  ngOnInit(): void {
    if(!this.service.isAR()){
      this.displayedColumns=  ['contractId','companyVendor','companyClient','amount','contractRaisedBy','fromDate','toDate','status','balance'];
    }
    if(this.service.isVCM() || this.service.isAR()){
    this.bkservice.getApprovedContract(this.companyId).subscribe(
      response=>{console.log(response)
        this.commonResponse=response
        if(this.commonResponse.statusCode===200){
          this.approvedcontractdtoArray=this.commonResponse.response
          console.log(this.approvedcontractdtoArray)
          //alert(this.commonResponse.response)
        }
        else  if(this.commonResponse.statusCode===404){
          this.empty=true
          this.errorMessage=this.commonResponse.response
          // this.matDialog.open(DialogErrorComponent,{
          //   data:this.commonResponse.response
          // })
        }
        else {
          this.errorMessage=this.commonResponse.response;
          this.matDialog.open(DialogErrorComponent,{
            data:this.commonResponse.response
          })
         }

        
      }
    )
  }else{
    this.bkservice.getApprovedContractClient(this.companyId).subscribe(
      response=>{console.log(response)
        this.commonResponse=response
        if(this.commonResponse.statusCode===200){
          this.approvedcontractdtoArray=this.commonResponse.response
          console.log(this.approvedcontractdtoArray)
          //alert(this.commonResponse.response)
        }
        else  if(this.commonResponse.statusCode===404){
          this.empty=true
          this.errorMessage=this.commonResponse.response
        }
        else {
          this.errorMessage=this.commonResponse.response;
          this.matDialog.open(DialogErrorComponent,{
            data:this.commonResponse.response
          })
         }

        
      }
    )
  }
  }
  openDialog(element:any){
    
//console.log(val);
this.matDialog.open(InvoiceCreationComponent,{
  width:"50%",
  data:element
})
  }

}
