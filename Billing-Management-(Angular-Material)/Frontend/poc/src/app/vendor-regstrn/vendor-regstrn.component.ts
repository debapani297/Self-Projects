import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../model/Company';
import { backendService } from '../service/backendservice';
import { FormBuilder } from '@angular/forms';
import { CommonResponse } from '../model/CommonResponse';
import { companyDto } from '../model/dto/companyDto';
import { LogInServiceService } from '../service/log-in-service.service';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';

@Component({
  selector: 'app-vendor-regstrn',
  templateUrl: './vendor-regstrn.component.html',
  styleUrls: ['./vendor-regstrn.component.css']
})
export class VendorRegstrnComponent implements OnInit {
  commonresponse:CommonResponse={
    response:{

    },
    statusCode:0
  }
  org:companyDto={
   companyId:0,
   companyName:'',
   companyLocation:'',
   companyType:''

  }
  loginForm = new FormGroup(
    {
      company: new FormControl(''),
      location: new FormControl(''),
      type: new FormControl('')
    }
  )

  constructor(private router:Router,
    private service:backendService,
    private loginService:LogInServiceService,
    public matDialog:MatDialog) { }


  ngOnInit(): void {
  }

  register() {
    this.org.companyName=this.company;
    this.org.companyLocation=this.location;
    this.org.companyType=this.type
    this.service.orgReg(this.org).subscribe(
      response=>{
        
        this.commonresponse=response;
        console.log(this.commonresponse)

        if(this.commonresponse.statusCode===201){

          this.matDialog.open(DialogBoxComponent,{
            data:""+ this.commonresponse.response.companyName + " is Registered Successfully"
  
          })
          this.router.navigate(['adminWelcome']);

        }
        else{
          this.matDialog.open(DialogErrorComponent,{
            data:"Failed to Register Company. \nDetails: \n"+ this.commonresponse.response,
          })
          this.router.navigate(['adminWelcome']);
        }
      }
    )

    

  }
  get company() {
    return this.loginForm.get('company')?.value
  }
  get location() {
    return this.loginForm.get('location')?.value
  }
  get type() {
    return this.loginForm.get('type')?.value
  }

}
