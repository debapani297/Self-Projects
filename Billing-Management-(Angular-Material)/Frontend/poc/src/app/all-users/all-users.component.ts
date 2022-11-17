import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { userDto } from '../model/dto/userDto';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

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
  displayedColumns: string[] = ['userId', 'userName', 'name', 'companyName', 'companytype', 'location'];
  dataSource = new MatTableDataSource<any>();

  ngOnInit(): void {
    this.refresh();
    // this.cdr.detectChanges();
  }
  refresh() {
    this.bkservice.allUser().subscribe(
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


      }

    )

  }


}
