import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { userDto } from '../model/dto/userDto';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent implements OnInit {

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
  constructor(private bkservice: backendService, private matDialog: MatDialog,
    public service: LogInServiceService) { }
  // displayedColumns: string[] = ['userId', 'userName', 'name', 'companyName', 'companytype', 'location', 'editUser', 'deleteUser'];
  displayedColumns: string[] = ['userId', 'userName', 'name', 'companyName', 'companytype', 'location', 'deleteUser'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.refresh();
    // this.cdr.detectChanges();
  }
  refresh() {
    this.bkservice.allActiveUser().subscribe(
      response => {
        this.commonResponse = response

        if (this.commonResponse.statusCode === 200) {
          this.usersDisplay = this.commonResponse.response
          this.dataSource = new MatTableDataSource(this.usersDisplay)
          this.dataSource.paginator = this.paginator

        } else if (this.commonResponse.statusCode === 404) {
          this.empty = true;
          this.errorMessage = this.commonResponse.response;
          // this.matDialog.open(DialogErrorComponent,{
          //   data:this.commonResponse.response
          // })
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
  delete(element: any) {
    this.bkservice.disableUser(element.userId).subscribe(
      response => {
        console.log(response)
        console.log(element.userId)
        this.cr = response

        console.log(this.cr)

        if(this.cr.statusCode===201){

          this.matDialog.open(DialogBoxComponent,{
            data:""+ this.cr.response.userName + " is Deactivated Successfully"
  
          }).afterClosed().subscribe(result =>{this.refresh()})
          //this.router.navigate(['adminWelcome']);

        }
        else{
          this.matDialog.open(DialogErrorComponent,{
            data:"Failed to Deactivate User. \nDetails: \n"+ this.cr.response,
          }).afterClosed().subscribe(result =>{this.refresh()})
         // this.router.navigate(['adminWelcome']);
        }

      }

    )

  }


}
