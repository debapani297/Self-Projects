import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { userDto } from '../model/dto/userDto';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.scss']
})
export class InactiveUsersComponent implements OnInit {

   //companyId=sessionStorage.getItem('companyId');
   commonResponse: CommonResponse = {
    response: undefined,
    statusCode: 0
  }
  commonResponse1: CommonResponse = {
    response: undefined,
    statusCode: 0
  }
  cr:CommonResponse={
    response: undefined,
    statusCode: 0
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator
  usersDisplay: userDto[] = []
  //userId=sessionStorage.getItem('userId')
  empty: boolean = false;
  errorMessage = '';
  constructor(private bkservice: backendService, private router: Router,private matDialog: MatDialog,
    public service: LogInServiceService) { }
  // displayedColumns: string[] = ['userId', 'userName', 'name', 'companyName', 'companytype', 'location', 'editUser', 'deleteUser'];
  displayedColumns: string[] = ['userId', 'userName', 'name', 'companyName', 'companytype', 'location', 'enableUser'];
  // dataSource = new MatTableDataSource<any>();

  dataSource = this.usersDisplay;
  
  
  


  ngOnInit(): void {
    this.refresh();
   //  this.cdr.detectChanges();
  }
  refresh() {
    this.bkservice.allInactiveUser().subscribe(
      response => {
        this.commonResponse = response

        if (this.commonResponse.statusCode === 200) {
          this.usersDisplay = this.commonResponse.response
        //  this.dataSource = new MatTableDataSource(this.usersDisplay)
       //   this.dataSource.paginator = this.paginator

        } else if (this.commonResponse.statusCode === 404) {
          this.empty = true;
          this.errorMessage = "No Inactive Users Are Presents"
          
          // this.commonResponse.response;
          //  this.matDialog.open(DialogErrorComponent,{
          //    data:this.commonResponse.response
           
        }
        else {
          //this.empty=true;
          this.matDialog.open(DialogErrorComponent, {
            data: this.commonResponse.response
          })
        }
      }
    )

  }
  enable(element: any) {
    this.bkservice.enableUser(element.userId).subscribe(
      response => {
        console.log(response)
       // console.log(element.userId)
        this.cr = response

       // console.log(this.cr)

         if(this.cr.statusCode===201){

          this.matDialog.open(DialogBoxComponent,{
            data:""+ this.cr.response.userName + " is Activated Successfully"
  
          }).afterClosed().subscribe(result =>{this.refresh()})

        //   //this.router.navigate(['adminWelcome']);

         }
         else if(this.cr.statusCode===403)
         {
          this.matDialog.open(DialogErrorComponent,{
            data:"Company is not active "
          }).afterClosed().subscribe(result =>{this.refresh()})

//          this.router.navigate(['getInactiveUsers']);
         }

        else{
          this.matDialog.open(DialogErrorComponent,{
            data:"Failed to Activate User"
          }).afterClosed().subscribe(result =>{this.refresh()})

//          this.router.navigate(['getInactiveUsers']);
         }

      }

    )

  }

}
