import { Component, OnInit } from '@angular/core';
import { userDto } from '../model/dto/userDto';

import { Role } from '../model/role';
import { User } from '../model/user';
import { backendService } from '../service/backendservice';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-regstrn',
  templateUrl: './admin-regstrn.component.html',
  styleUrls: ['./admin-regstrn.component.css']
})
export class AdminRegstrnComponent implements OnInit {
 
  admin:userDto = {
    userName: '',
    password: '',
    roleId: 1,
    status: null
  }

  

  constructor(private service: backendService,private router:Router) { }

  ngOnInit(): void {
  }

  regForm =new FormGroup({
    user:new FormControl(''),
    pwd:new FormControl('')


  })
  

  register() {

    this.admin.userName=this.user;
    this.admin.password=this.pwd;
    this.service.adminReg(this.admin).subscribe(response => {
      console.log(response);
      response=this.admin
      this.router.navigate(['login'])

    }
    )
}

get user(){
 return this.regForm.get('user')?.value
}

get  pwd(){
  return this.regForm.get('pwd')?.value
}

}
