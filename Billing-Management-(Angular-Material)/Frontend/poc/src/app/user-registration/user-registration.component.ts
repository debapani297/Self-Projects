import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { Company } from '../model/Company';
import { CompanyUser } from '../model/CompanyUser';
import { companyDto } from '../model/dto/companyDto';
import { CompanyUserDto } from '../model/dto/companyUserDto';
import { Role } from '../model/role';
import { User } from '../model/user';
import { backendService } from '../service/backendservice';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  companies: Company[] = []
  role: Role[] = []
  commonresponse: CommonResponse = {
    response: undefined,
    statusCode: 0
  }
  commonresponse1: CommonResponse = {
    response: undefined,
    statusCode: 0
  }

  companySelected='';
  modifiedText = ''
  user: CompanyUserDto = {
    userName: '',
    name: '',
    password: '',
    companyId: 0,
    roleId: 0
  }

  finalresponse: CommonResponse = {
    response: undefined,
    statusCode: 0
  } 
  company1!: Company;

  loginForm = new FormGroup(
    {
      name1: new FormControl('', Validators.required),
      username1: new FormControl(''),
      password1: new FormControl(''),
      company: new FormControl(''),
      userRole: new FormControl('')
    }
  )

  constructor(private service: backendService, private router: Router, public matDialog:MatDialog) { }

  ngOnInit(): void {
    this.service.getCompanies().subscribe(
      response => {
        this.commonresponse = response;
        this.companies = this.commonresponse.response
      }
    )
  }

  register() {

    this.user.userName = this.username1
    this.user.password = this.password1
    this.user.name = this.name1
    this.user.companyId = this.company.companyId
    this.user.roleId = this.userRole
    console.log(this.name1)
    console.log(this.loginForm.get('name1')?.value)

    this.service.userReg(this.user).subscribe(
      response => {

        this.finalresponse=response;
        console.log(this.finalresponse)

        if(this.finalresponse.statusCode===201){

          this.matDialog.open(DialogBoxComponent,{
            data:""+ this.finalresponse.response.userName + " is Registered Successfully"
  
          })
          this.router.navigate(['adminWelcome']);

        }
        else{
          this.matDialog.open(DialogErrorComponent,{
            data:"Failed to Register User. \nDetails: \n"+ this.finalresponse.response,
          })
          this.router.navigate(['adminWelcome']);
        }
      }
    )
  

  }


  get name1() {
    return this.loginForm.get('name1')?.value
  }

  get username1() {
    return this.loginForm.get('username1')?.value
  }

  get password1() {
    return this.loginForm.get('password1')?.value
  }
  get company() {
    return this.loginForm.get('company')?.value
  }
  get userRole() {
    return this.loginForm.get('userRole')?.value
  }

  onCompanySelected(val: Company) {
    
    this.service.getRoles(val.companyType).subscribe(
      response => {
        
        this.commonresponse1=response
        
        if(this.commonresponse1.statusCode==404){
        }
        if(this.commonresponse1.statusCode==200){
          this.role=this.commonresponse1.response;
        }
      }
    )
  }
  customFunction(val: any) {
    this.company1 = val
  }

}
