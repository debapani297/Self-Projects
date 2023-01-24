import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from '../Dialogs/dialog-error/dialog-error.component';
import { CommonResponse } from '../model/CommonResponse';
import { InvoiceDisplay } from '../model/dto/invoice-display';
import { backendService } from '../service/backendservice';
import { LogInServiceService } from '../service/log-in-service.service';

@Component({
  selector: 'app-paid-invoice',
  templateUrl: './paid-invoice.component.html',
  styleUrls: ['./paid-invoice.component.css']
})
export class PaidInvoiceComponent implements OnInit {

  companyId = sessionStorage.getItem('companyId');
  commonResponse: CommonResponse = {
    response: undefined,
    statusCode: 0
  }
  commonResponse1: CommonResponse = {
    response: undefined,
    statusCode: 0
  }
  invoiceDisplay: InvoiceDisplay[] = []
  userId = sessionStorage.getItem('userId')
  empty: boolean = false;
  errorMessage = '';
  constructor(private bkservice: backendService, private matDialog: MatDialog, public service: LogInServiceService) { }
  displayedColumns: string[] = ['invoiceId', 'contractId', 'companyVendor', 'companyClient', 'invoiceAmount', 'dueDate', 'invoiceRaisedBy', 'status'];
  dataSource = this.invoiceDisplay;

  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.bkservice.getPaidInvoice(this.companyId).subscribe(
      response => {
        console.log(response)
        this.commonResponse = response
        console.log(this.commonResponse)
        if (this.commonResponse.statusCode === 200) {
          this.invoiceDisplay = this.commonResponse.response

        } else if (this.commonResponse.statusCode === 404) {
          this.empty = true
          this.errorMessage = this.commonResponse.response

        } else {
          this.matDialog.open(DialogErrorComponent, {
            data: this.commonResponse.response
          })
        }
      }
    )
  }

}
