import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { companyDto } from '../model/dto/companyDto';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-inactive-organisations',
  templateUrl: './inactive-organisations.component.html',
  styleUrls: ['./inactive-organisations.component.scss']
})
export class InactiveOrganisationsComponent implements OnInit {

  commonResponse: CommonResponse = {
    response: undefined,
    statusCode: 0
  }
  commonResponse1: CommonResponse = {
    response: undefined,
    statusCode: 0
  }

  cr: CommonResponse = {
    response: undefined,
    statusCode: 0
  }
  companyDisplay: companyDto[] = []
  //userId=sessionStorage.getItem('userId')
  empty: boolean = false;
  errorMessage = '';
  constructor(private bkservice: backendService, private matDialog: MatDialog, public service: LogInServiceService) { }
  displayedColumns: string[] = ['companyId', 'companyName', 'companyLocation', 'companyType', 'actions'];
  dataSource = this.companyDisplay;
  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.bkservice.getInactiveCompanies().subscribe(
      response => {
        this.commonResponse = response

        if (this.commonResponse.statusCode === 200) {
          this.companyDisplay = this.commonResponse.response

        } else if (this.commonResponse.statusCode === 404) {
          this.empty = true;
          this.errorMessage = "No Inactive Companies Are Presents.";
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
  enable(element: any) {
    this.bkservice.enableCompany(element.companyId).subscribe(
      response => {

    
        console.log(response)
        this.cr = response

        if(this.cr.statusCode===200){

          this.matDialog.open(DialogBoxComponent,{
            data:""+ this.cr.response.company.companyName + " is Activated Successfully"
  
          }).afterClosed().subscribe(result =>{this.refresh()})

        //   //this.router.navigate(['adminWelcome']);

         }
        else{
          this.matDialog.open(DialogErrorComponent,{
            data:"Failed to Activate Company"
          }).afterClosed().subscribe(result =>{this.refresh()})

//          this.router.navigate(['getInactiveUsers']);
         }

      }

    )

  }


}
