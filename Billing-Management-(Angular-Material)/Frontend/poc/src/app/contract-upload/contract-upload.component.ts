import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';

import { CommonResponse } from '../model/CommonResponse';
import { Company } from '../model/Company';
import { Contracts } from '../model/Contracts';
import { ContractDetailsdto } from '../model/dto/contract-detailsdto';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-contract-upload',
  templateUrl: './contract-upload.component.html',
  styleUrls: ['./contract-upload.component.css']
})
export class ContractUploadComponent implements OnInit {
      x = new Date();
  commonResponse:CommonResponse={
    response: undefined,
    statusCode: 0
  }
   userId=sessionStorage.getItem('userId');
   companyId=sessionStorage.getItem('companyId')
 
     

  clientName='';
  contractDetails:Contracts={vendor:'',client:'',fromDate:'',toDate:'',contractRaisedBy:'',contractApprovedBy:'',status:'Pending',amount:''}
  
  clientsCompanies:Company[]=[];
  user=this.route.snapshot.params['user'];
  uploadMessage="File Uploaded Successfully";
  isFileUploaded=false;
  contractCreate:ContractDetailsdto={
    amount: 0,
    fromDate: '',
    toDate: '',
    companyVendorId: '',
    companyClientId: '',
    contractApprovedById: '',
    contractRaisedById: '',
    status: ''
  } 
 // clientsCompanies=['Wipro','TechMahindra','TATA Steels','TATA Motors'];
  fileName:any;
  contractUpload=new FormGroup({
    vendorName:new FormControl(sessionStorage.getItem('authUser'),[Validators.required]),
    client:new FormControl('',[Validators.required]),
    fromDate:new FormControl('',[Validators.required]),
    toDate:new FormControl('',[Validators.required]),
    contractAmount:new FormControl('',[Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    fileInput:new FormControl('',[Validators.required]),
    contractStatus:new FormControl('Pending',[Validators.required]),
    vendorId:new FormControl(sessionStorage.getItem('companyId')),
    userId:new FormControl(sessionStorage.getItem('userId'))
          }

  )

  constructor(private route:ActivatedRoute,
    private service:backendService,
    private service1:LogInServiceService,
    private http:HttpClient,private router:Router,public matDialog:MatDialog) { }

  ngOnInit(): void {
    console.log("Hello INIT");
    this.service.getAllClients().subscribe(
      response=>{
        console.log("Response"+response)
      this.commonResponse=  response
        console.log(this.commonResponse)
          this.clientsCompanies=this.commonResponse.response
      }
    )
  }

  contractCreation(){
    //this.contractDetails={vendor:this.vendor,client:this.client,fromDate:this.startDate,toDate:this.endDate,amount:this.contractAmount,status:'Pending',contractRaisedBy:'',contractApprovedBy:''}
    this.contractCreate.companyVendorId=this.contractUpload.get('vendorId')?.value;
    this.contractCreate.companyClientId=this.contractUpload.get('client')?.value;
    this.contractCreate.contractRaisedById=this.contractUpload.get('userId')?.value;
    this.contractCreate.fromDate=this.contractUpload.get('fromDate')?.value;
    this.contractCreate.toDate=this.contractUpload.get('toDate')?.value;
    this.contractCreate.status=this.contractUpload.get('contractStatus')?.value;
    this.contractCreate.amount=this.contractUpload.get('contractAmount')?.value
console.log(this.contractCreate);

if(this.contractUpload.get('fromDate')?.value<new Date().getDate){
  this.matDialog.open(DialogErrorComponent,{
    data:" From Date can't be a past date"
  })

}
else if(this.contractUpload.get('toDate')?.value<this.contractUpload.get('fromDate')?.value || this.contractUpload.get('toDate')?.value===this.contractUpload.get('fromDate')?.value){
  this.matDialog.open(DialogErrorComponent,{
    data:" To Date can't be less or equal to From Date of Contract"
  })
}
else{
     //Calling Api for Post
    this.service.addContract(this.contractCreate).subscribe(
     response=>{console.log(response)
      this.commonResponse=response
      if(this.commonResponse.statusCode===201){
        this.matDialog.open(DialogBoxComponent,{
          data:"Contract Uploaded Successfully"

        })
        this.router.navigate(['vcmWelcome'])
        this.contractUpload.get('fromDate')?.value.clear();
      }else{
       this.matDialog.open(DialogErrorComponent,{
         data:"Failed to Upload Contract"
       })
      }
    }
     );
    }
    // console.log(this.contractUpload.value);
    //   console.log(this.contractDetails);
    }
  
    onFileSelected(event:any){
      const file:File = event.target.files[0];
  
      if (file) {
  
          this.fileName = file.name;
  
          const formData = new FormData();
  
          formData.append("thumbnail", file);
  
          // const upload$ = this.http.post("/api/thumbnail-upload", formData);
  
          // upload$.subscribe();
           this.isFileUploaded=true;
          
      }
    }
   
    logout(){
      if(this.service1.logout()){
        this.router.navigate(['logout']);
      } 
    }
   
    previousPage(){
  this.router.navigate(['welcomeVendorContractManager',sessionStorage.getItem('authUser')]);
    }
    get vendor(){
      return this.contractUpload.get('vendorName')?.value;
    }
  
    get client(){
      return this.contractUpload.get('clientName')?.value;
    }
    get startDate(){
      return this.contractUpload.get('fromDate')?.value;
    }
    get endDate(){
      return this.contractUpload.get('toDate')?.value;
    }
    get contractAmount(){
      return this.contractUpload.get('contractAmount')?.value;
    }
    get contractStatus(){
      return this.contractUpload.get('contractStatus')?.value;
    }
    get fileInput(){
      return this.contractUpload.get('fileInput')?.value;
    }
    

}
