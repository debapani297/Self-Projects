import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PendingContractsDto } from '../model/dto/pending-contracts-dto';
import { CommonResponse } from '../model/CommonResponse';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-pending-contract-list',
  templateUrl: './pending-contract-list.component.html',
  styleUrls: ['./pending-contract-list.component.css']
})
export class PendingContractListComponent implements OnInit {

  companyId = sessionStorage.getItem('companyId');
  userId = sessionStorage.getItem('userId');
  errorMessage = '';
  commonResponse: CommonResponse = {
    response: undefined,
    statusCode: 0
  }
  commonResponse1: CommonResponse = {
    response: undefined,
    statusCode: 0
  }
  pendindcontractdtoArray: any;
 
  vendor = sessionStorage.getItem('authUser');
  displayedColumns: string[] = ['contractId', 'companyVendor', 'companyClient', 'amount', 'contractRaisedBy', 'fromDate', 'toDate', 'status', 'balance'];
  dataSource !: MatTableDataSource<PendingContractsDto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
empty: boolean = false;
 
  constructor(public service: LogInServiceService, private router: Router, private bkService: backendService,
    private matDialog: MatDialog,private _liveAnnouncer: LiveAnnouncer) { }
 

  ngOnInit(): void {
    this.refresh();
  }
  
  refresh() {

    this.empty = false;
    if (this.service.isCCM()) {
      this.displayedColumns = ['contractId', 'companyVendor', 'companyClient', 'amount', 'contractRaisedBy', 'fromDate', 'toDate', 'status', 'balance', 'action'];
    }
    if (this.service.isVCM() || this.service.isAR()) {
      this.bkService.getPendingContract(this.companyId).subscribe(
        response => {
          console.log(response)
          this.commonResponse = response

          if (this.commonResponse.statusCode === 200) {
            this.pendindcontractdtoArray = this.commonResponse.response
            this.dataSource=new MatTableDataSource(this.pendindcontractdtoArray)
           this.dataSource.paginator=this.paginator
           this.dataSource.sort=this.sort
           
            console.log(this.commonResponse)
            console.log("********************************")
            console.log(this.pendindcontractdtoArray)
          }
          else if (this.commonResponse.statusCode === 404) {
            this.empty = true;
            this.errorMessage = this.commonResponse.response;
            
          }
          else {
            this.errorMessage = this.commonResponse.response;
            this.matDialog.open(DialogErrorComponent, {
              data: this.errorMessage
            })
          }

        }
      )
    }
    else {
      this.bkService.getPendingContractClient(this.companyId).subscribe(
        response => {
          console.log(response)
          this.commonResponse = response
          if (this.commonResponse.statusCode === 200) {
            this.pendindcontractdtoArray = this.commonResponse.response
            this.dataSource=new MatTableDataSource(this.pendindcontractdtoArray)
            this.dataSource.paginator=this.paginator
            this.dataSource.sort=this.sort
            console.log(this.commonResponse)
            console.log("********************************")
            console.log(this.pendindcontractdtoArray)
          }
          else if (this.commonResponse.statusCode === 404) {
            this.empty = true;
            this.errorMessage = this.commonResponse.response;
            
          }
          else {
            this.errorMessage = this.commonResponse.response;
            this.matDialog.open(DialogErrorComponent, {
              data: this.errorMessage
            })
          }

        }
      )
    }
  }

  applyfilter(event:Event){
    const filterValue =(event.target as HTMLInputElement).value;
    this.dataSource.filter =filterValue.trim().toLowerCase()

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }

  }
  changeStatus(element: any) {
    this.bkService.approveContract(element.contractId, this.userId).subscribe(
      response => {
        this.commonResponse1 = response
        if (this.commonResponse1.statusCode === 200) {

          this.matDialog.open(DialogBoxComponent, {
            data: "Contract Approved Successfully"
          })
          this.refresh()
        } else {
          this.matDialog.open(DialogErrorComponent, {
            data: this.commonResponse1.response
          })
        }
      }
    )
  }

  
}
