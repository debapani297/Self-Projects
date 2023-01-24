import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { companyDto } from '../model/dto/companyDto';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-all-organisations',
  templateUrl: './all-organisations.component.html',
  styleUrls: ['./all-organisations.component.scss']
})
export class AllOrganisationsComponent implements OnInit{
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
  
  empty: boolean = false;
  errorMessage = '';


  displayedColumns: string[] = ['companyId', 'companyName', 'companyLocation', 'companyType', 'actions'];
  
  dataSource = new MatTableDataSource<companyDto>()

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort

  constructor(private bkservice: backendService, 
    private matDialog: MatDialog, 
    public service: LogInServiceService,
    private _liveAnnouncer: LiveAnnouncer) { 

      this.refresh();
    }
  ngOnInit(): void {
    
    this.refresh();
  }

  refresh() {
    this.bkservice.getCompanies().subscribe(
      response => {
        this.commonResponse = response

        if (this.commonResponse.statusCode === 200) {
          this.companyDisplay = this.commonResponse.response
          this.dataSource=new MatTableDataSource<companyDto>(this.companyDisplay)
          this.dataSource.paginator=this.paginator
          this.dataSource.sort=this.sort

        } else if (this.commonResponse.statusCode === 404) {
          this.empty = true;
          this.errorMessage = "No Active Companies Are Present.";
        }
        else {
          this.matDialog.open(DialogErrorComponent, {
            data: this.commonResponse.response
          })
        }
      }
    )
  }

  applyfilter(event:Event){
    const filterValue =(event.target as HTMLInputElement).value;
    this.dataSource.filter =filterValue.trim().toLowerCase()

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }

  }

  delete(element: any) {
    this.bkservice.disableCompany(element.companyId).subscribe(
      response => {

    
        console.log(response)
        this.cr = response

        console.log(this.cr)
        if(this.cr.statusCode===200){

          this.matDialog.open(DialogBoxComponent,{
            data:""+ this.cr.response.company.companyName + " is Deactivated Successfully"
  
          }).afterClosed().subscribe(result =>{this.refresh()})

         }
         else if(this.cr.statusCode===405){
          this.matDialog.open(DialogErrorComponent,{
            data:""+this.cr.response+" Invoices are yet to be closed. " 
          }).afterClosed().subscribe(result =>{this.refresh()})
         }
        else{
          this.matDialog.open(DialogErrorComponent,{
            data:"Failed to Activate Company"
          }).afterClosed().subscribe(result =>{this.refresh()})
         }

      }

    )

  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
