import { Component, OnInit } from '@angular/core';
import { CommonResponse } from '../model/CommonResponse';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-admin-welcome',
  templateUrl: './admin-welcome.component.html',
  styleUrls: ['./admin-welcome.component.css']
})
export class AdminWelcomeComponent implements OnInit {

  commonResponse:CommonResponse={
    response: undefined,
    statusCode: 0
  }

  commonResponse1:CommonResponse={
    response: undefined,
    statusCode: 0
  }

  users:CommonResponse={
    response: undefined,
    statusCode: 0
  }
  vendorCompanies:number | undefined
  clientCompanies:number | undefined
  totalUsers:number | undefined

  constructor(private service:backendService,public loginService:LogInServiceService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(
      response1=>{
        console.log(response1)
        this.users=response1
        this.totalUsers=this.users.response.length
        console.log(this.users.response.length)

      }
    )

    this.service.getAllClients().subscribe(
      response=>{
        if(response.statusCode===200){
          console.log(response)
          this.commonResponse=response;
          console.log(this.commonResponse.response.length)
          this.clientCompanies=this.commonResponse.response.length
        }else{
          this.clientCompanies=0;
        }
       
      }
    )

    this.service.getUsers().subscribe(
      response1=>{
        if(response1.statusCode===200){
           console.log(response1)
        this.users=response1
        this.totalUsers=this.users.response.length
        console.log(this.users.response.length)

        }else{
          this.totalUsers=0;
        }

       

      }
    )

    this.service.getAllVendors().subscribe(
      response2=>{
        console.log(response2)
        if(response2.statusCode===200){
          this.commonResponse1=response2
       console.log(this.commonResponse1.response.length)
        this.vendorCompanies=this.commonResponse1.response.length

        }else{
          this.vendorCompanies=0;
        }
      
      }
    )


    
  }

}
