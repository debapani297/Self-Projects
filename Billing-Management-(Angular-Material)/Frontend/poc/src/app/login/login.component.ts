import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { CommonResponse } from '../model/CommonResponse';

import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'AD_asdj'
  password1 = '12345'
  usertype = 'admin'
  invalidLogin = false
  selected=''

  constructor(private router: Router,private matDialog: MatDialog, private service: backendService, private loginService: LogInServiceService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    userType: new FormControl('',[Validators.required])

  })


  commonresponse: CommonResponse = {
    response: {

    },
    statusCode: 0

  }

  login() {

    this.service.getAdmin(this.loginForm.get('user')?.value).subscribe(
      response => {
        this.commonresponse = response;
        //  console.log(response)
        if (this.commonresponse.statusCode === 500) {
          console.log(this.commonresponse.response)
        }
         else {
          if (this.loginForm.get('password')?.value === this.commonresponse.response.password) {
            sessionStorage.setItem('authUser', this.commonresponse.response.userName)
            sessionStorage.setItem('roleId',this.commonresponse.response.roles.roleId)
            if(this.commonresponse.response.roles.roleId!==1){
            sessionStorage.setItem('companyId',this.commonresponse.response.company.companyId);
          }
            console.log("Loggin userId: "+this.commonresponse.response.userId);
            sessionStorage.setItem('userId',this.commonresponse.response.userId);

            if (this.loginService.isUserLoggedIn()) {
              if(this.commonresponse.response.roles.roleId===1){ this.router.navigate(['adminWelcome']);}
              else if(this.commonresponse.response.roles.roleId===2){ this.router.navigate(['vcmWelcome']);}
              else if(this.commonresponse.response.roles.roleId===3){ this.router.navigate(['dashboard']);}
              else if(this.commonresponse.response.roles.roleId===4){ this.router.navigate(['dashboard']);}
              else if(this.commonresponse.response.roles.roleId===5){ this.router.navigate(['dashboard']);}
              else if(this.commonresponse.response.roles.roleId===6){ this.router.navigate(['dashboard']);}
            // else{this.router.navigate(['userWelcome'])}//to be created
            } 
            else{
              this.matDialog.open(DialogErrorComponent,{
                data:"Incorrect Username Or Password"
              }).afterClosed().subscribe(result =>{this.router.navigate([''])})
              
             }
            

          }else{
              this.matDialog.open(DialogErrorComponent,{
                data:"Incorrect Username Or Password"
              }).afterClosed().subscribe(result =>{this.router.navigate([''])})
              
             
            this.invalidLogin=true;
          }
         


        }



      }
    )

  }

  signup() {
    this.router.navigate(['adminRegistration'])

  }


  get user() {
    return this.loginForm.get('user')
  }

  get password() {
    return this.loginForm.get('password')
  }

}
