import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';
import { CommonResponse } from '../model/CommonResponse';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  pendingContracts:number | undefined
  approvedContracts:number | undefined

  acceptedInvoice:number | undefined
  approvedInvoice:number | undefined

  commonResponse:CommonResponse={
    response: undefined,
    statusCode: 0
  }

  commonResponse1:CommonResponse={
    response: undefined,
    statusCode: 0
  }

  commonResponse2:CommonResponse={
    response: undefined,
    statusCode: 0
  }
  commonResponse3:CommonResponse={
    response: undefined,
    statusCode: 0
  }
  
  companyId=sessionStorage.getItem('companyId');
  
  constructor(private service:backendService,public loginService:LogInServiceService) {}
  ngOnInit(): void {
    this.service.getPendingContractClient(this.companyId).subscribe(
      response=>{
        this.commonResponse=response;
        console.log(response)
         if(this.commonResponse.statusCode===404){
           this.pendingContracts=0;
         }else{
           this.pendingContracts=this.commonResponse.response.length
         }
      }
    )

    this.service.getApprovedContractClient(this.companyId).subscribe(
      response1=>{

        this.commonResponse1=response1;
        console.log(response1)
        if(this.commonResponse1.statusCode===404){
          this.approvedContracts=0;
        }else{
          this.approvedContracts=this.commonResponse1.response.length
        }
        
      }
    )

    this.service.getReviewedInvoice(this.companyId).subscribe(
      response=>{
        this.commonResponse2=response;
        console.log(response)
         if(this.commonResponse2.statusCode===404){
           this.acceptedInvoice=0;
         }else{
           this.acceptedInvoice=this.commonResponse2.response.length
         }
      }
    )


    this.service.getApprovedInvoice(this.companyId).subscribe(
      response1=>{
        this.commonResponse3=response1;
        if(this.commonResponse3.statusCode===404){
          this.approvedInvoice=0;
        }else{
          this.approvedInvoice=this.commonResponse3.response.length
        }
        
      }
    )
  }
}
