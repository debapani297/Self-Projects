import { Component, OnInit } from '@angular/core';
import { CommonResponse } from '../model/CommonResponse';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-vcm-welcome',
  templateUrl: './vcm-welcome.component.html',
  styleUrls: ['./vcm-welcome.component.css']
})
export class VcmWelcomeComponent implements OnInit {

  companyId=sessionStorage.getItem('companyId');
  commonResponse:CommonResponse={
    response: undefined,
    statusCode: 0
  }

  commonResponse1:CommonResponse={
    response: undefined,
    statusCode: 0
  }
  
  pendingContracts:number | undefined
  approvedContracts:number | undefined

  constructor(public loginService:LogInServiceService,private service:backendService) { }

  ngOnInit(): void {
    this.service.getPendingContract(this.companyId).subscribe(
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


    this.service.getApprovedContract(this.companyId).subscribe(
      response1=>{
        this.commonResponse1=response1;
        if(this.commonResponse1.statusCode===404){
          this.approvedContracts=0;
        }else{
          this.approvedContracts=this.commonResponse1.response.length
        }
        
      }
    )
  }

}
