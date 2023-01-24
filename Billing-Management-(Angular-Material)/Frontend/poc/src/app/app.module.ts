import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CustomMaterialModule } from './custom-material-module';
import { FormsModule } from '@angular/forms';
import { AdminWelcomeComponent } from './admin-welcome/admin-welcome.component';
import { AdminRegstrnComponent } from './admin-regstrn/admin-regstrn.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorRegstrnComponent } from './vendor-regstrn/vendor-regstrn.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { HeaderComponent } from './header/header.component';


import { MatPaginatorModule } from '@angular/material/paginator';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LogoutComponent } from './logout/logout.component';
import {  HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { ApprovedContractListComponent } from './approved-contract-list-component/approved-contract-list-component.component';
//import { ApprovedinvoicelistComponent } from './approvedinvoicelist/approvedinvoicelist.component';
import { ContractUploadComponent } from './contract-upload/contract-upload.component';
import { InvoiceCreationComponent } from './invoice-creation/invoice-creation.component';
import { PendingContractListComponent } from './pending-contract-list/pending-contract-list.component';
//import { PendinginvoicelistComponent } from './pendinginvoicelist/pendinginvoicelist.component';
import { ErrorComponent } from './error/error.component';
//import { VCMWelcomeComponent } from './vcmwelcome/vcmwelcome.component';
import { VcmWelcomeComponent } from './vcm-welcome/vcm-welcome.component';
import { DialogBoxComponent } from './Dialogs/dialog-box/dialog-box.component';
import { DialogErrorComponent } from './Dialogs/dialog-error/dialog-error.component';
import { PendingInvoiceComponent } from './pending-invoice/pending-invoice.component';
import { AcceptedInvoiceComponent } from './accepted-invoice/accepted-invoice.component';
import { ApprovedInvoiceComponent } from './approved-invoice/approved-invoice.component';
import { PendingPaymentsComponent } from './pending-payments/pending-payments.component';
import { PaidPaymentsComponent } from './paid-payments/paid-payments.component';
import { PaidInvoiceComponent } from './paid-invoice/paid-invoice.component';
import { AllOrganisationsComponent } from './all-organisations/all-organisations.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { InactiveOrganisationsComponent } from './inactive-organisations/inactive-organisations.component';
import { CcmWelcomeComponent } from './ccm-welcome/ccm-welcome.component';
import { ArWelcomeComponent } from './ar-welcome/ar-welcome.component';
import { CpmWelcomeComponent } from './cpm-welcome/cpm-welcome.component';
import { ApWelcomeComponent } from './ap-welcome/ap-welcome.component';
import { MatSortModule } from '@angular/material/sort';


//import { PendingContractsComponent } from './pending-contracts/pending-contracts.component';
//import { DialogErrorComponent } from './Dialog/dialog-error/dialog-error.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminWelcomeComponent,
    AdminRegstrnComponent,
    VendorRegstrnComponent,
    UserRegistrationComponent,
    HeaderComponent,
    DashboardComponent,
    LogoutComponent,
    FooterComponent,
    ApprovedContractListComponent,
   // ApprovedinvoicelistComponent,
    ContractUploadComponent,
    InvoiceCreationComponent,
    PendingContractListComponent,
    //PendinginvoicelistComponent,
    ErrorComponent,
    VcmWelcomeComponent,
    DialogBoxComponent,
    DialogErrorComponent,
    PendingInvoiceComponent,
    AcceptedInvoiceComponent,
    ApprovedInvoiceComponent,
    PendingPaymentsComponent,
    PaidPaymentsComponent,
    PaidInvoiceComponent,
    AllOrganisationsComponent,
    AllUsersComponent,
    ActiveUsersComponent,
    InactiveUsersComponent,
    InactiveOrganisationsComponent,
    CcmWelcomeComponent,
    ArWelcomeComponent,
    CpmWelcomeComponent,
    ApWelcomeComponent
    
   
  
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
