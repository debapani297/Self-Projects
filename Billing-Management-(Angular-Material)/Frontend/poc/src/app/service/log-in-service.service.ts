import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonResponse } from '../model/CommonResponse';
import { backendService } from './backendservice';

@Injectable({
  providedIn: 'root'
})
export class LogInServiceService {

  commonResponse: CommonResponse={
    response:{

    },
    statusCode:0

  }

  constructor(private router: Router,private service:backendService) { }

  authenticateAdmin(username: any, password: any, usertype: any) {
    if (username !== null && username == 'viru' && password !== null && password == 12345 && usertype == 'Admin') {
      sessionStorage.setItem('authUser', username)
      return true;

    } else {
      return false;
    }
  }

  saveInSession(response:any){

  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authUser')
    return !(user == null)

  }
  isAdmin(){
    if(sessionStorage.getItem('roleId')==="1"){
      return true;
    }
    return false;
  }

  isVCM(){
   if(sessionStorage.getItem('roleId')==="2"){
      return true;
}

return false;
  }

  isAR(){
   if(sessionStorage.getItem('roleId')==="3"){
       return true;
 }
 
 return false;
   }

   isCPM(){
     if(sessionStorage.getItem('roleId')==="5"){
       return true;
 }
 
 return false;
   }

   isCCM(){
    if(sessionStorage.getItem('roleId')==="4"){
       return true;
 }
 
 return false;
   }

   isAP(){
     if(sessionStorage.getItem('roleId')==="6"){
       return true;
 }
 
 return false;
   }


  logout() {
    sessionStorage.removeItem('authUser');
    sessionStorage.removeItem('roleId');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('companyId');
    return true;
  }
}
