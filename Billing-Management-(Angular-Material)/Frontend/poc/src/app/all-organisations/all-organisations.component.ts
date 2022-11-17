import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { companyDto } from '../model/dto/companyDto';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-all-organisations',
  templateUrl: './all-organisations.component.html',
  styleUrls: ['./all-organisations.component.scss']
})
export class AllOrganisationsComponent implements OnInit {
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
    this.bkservice.getCompanies().subscribe(
      response => {
        this.commonResponse = response

        if (this.commonResponse.statusCode === 200) {
          this.companyDisplay = this.commonResponse.response

        } else if (this.commonResponse.statusCode === 404) {
          this.empty = true;
          this.errorMessage = "No Active Companies Are Present.";
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
    this.bkservice.disableCompany(element.companyId).subscribe(
      response => {

    
        console.log(response)
        this.cr = response


      }

    )

  }

}
