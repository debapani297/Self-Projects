import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedInvoiceComponent } from './accepted-invoice/accepted-invoice.component';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { AdminRegstrnComponent } from './admin-regstrn/admin-regstrn.component';
import { AdminWelcomeComponent } from './admin-welcome/admin-welcome.component';
import { AllOrganisationsComponent } from './all-organisations/all-organisations.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ApprovedContractListComponent } from './approved-contract-list-component/approved-contract-list-component.component';
import { ApprovedInvoiceComponent } from './approved-invoice/approved-invoice.component';
import { CcmWelcomeComponent } from './ccm-welcome/ccm-welcome.component';
//import { ApprovedinvoicelistComponent } from './approvedinvoicelist/approvedinvoicelist.component';
import { ContractUploadComponent } from './contract-upload/contract-upload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { InactiveOrganisationsComponent } from './inactive-organisations/inactive-organisations.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { InvoiceCreationComponent } from './invoice-creation/invoice-creation.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PaidInvoiceComponent } from './paid-invoice/paid-invoice.component';
import { PaidPaymentsComponent } from './paid-payments/paid-payments.component';
import { PendingContractListComponent } from './pending-contract-list/pending-contract-list.component';
import { PendingInvoiceComponent } from './pending-invoice/pending-invoice.component';
import { PendingPaymentsComponent } from './pending-payments/pending-payments.component';
//import { PendinginvoicelistComponent } from './pendinginvoicelist/pendinginvoicelist.component';
import { RouteguradServiceService } from './service/routegurad-service.service';

import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { VcmWelcomeComponent } from './vcm-welcome/vcm-welcome.component';
import { VendorRegstrnComponent } from './vendor-regstrn/vendor-regstrn.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"login", component:LoginComponent},
   {path:"adminRegistration", component:AdminRegstrnComponent},
  {path:"companyOnboarding", component:VendorRegstrnComponent,canActivate:[RouteguradServiceService]},
  {path:"userManagement", component:UserRegistrationComponent,canActivate:[RouteguradServiceService]},
  {path:"adminWelcome", component:AdminWelcomeComponent,canActivate:[RouteguradServiceService]},
  {path:"userRegistration", component:UserRegistrationComponent,canActivate:[RouteguradServiceService]},
  {path:"logout", component:LogoutComponent,canActivate:[RouteguradServiceService]},
  {path:"dashboard", component:DashboardComponent,canActivate:[RouteguradServiceService]},
  {path:'contractUpload',component:ContractUploadComponent,canActivate:[RouteguradServiceService]},
  {path:'pendingContract',component:PendingContractListComponent,canActivate:[RouteguradServiceService]},
  {path:'approvedContracts',component:ApprovedContractListComponent,canActivate:[RouteguradServiceService]},
  {path:'pendingInvoice',component:PendingInvoiceComponent,canActivate:[RouteguradServiceService]},
  //{path:'approvedInvoice',component:ApprovedinvoicelistComponent,canActivate:[RouteguradServiceService]},
  {path:'invoiceCreation',component:InvoiceCreationComponent,canActivate:[RouteguradServiceService]},
  {path:'acceptedInvoice',component:AcceptedInvoiceComponent,canActivate:[RouteguradServiceService]},
  {path:'approvedInvoice',component:ApprovedInvoiceComponent,canActivate:[RouteguradServiceService]},
  {path:'pendingPayments',component:PendingPaymentsComponent,canActivate:[RouteguradServiceService]},
  {path:'paidPayments',component:PaidPaymentsComponent,canActivate:[RouteguradServiceService]},
  {path:'paidInvoice',component:PaidInvoiceComponent,canActivate:[RouteguradServiceService]},
  // {path:'**',component:ErrorComponent,canActivate:[RouteguradServiceService]},
  {path:'getAllCompanies',component:AllOrganisationsComponent,canActivate:[RouteguradServiceService]},
  {path:'getInactiveCompanies',component:InactiveOrganisationsComponent,canActivate:[RouteguradServiceService]},
  {path:'getAllUsers',component:AllUsersComponent,canActivate:[RouteguradServiceService]},
  {path:'getActiveUsers',component:ActiveUsersComponent,canActivate:[RouteguradServiceService]},
  {path:'getInactiveUsers',component:InactiveUsersComponent,canActivate:[RouteguradServiceService]},
  {path:'vcmWelcome',component:VcmWelcomeComponent,canActivate:[RouteguradServiceService]},
  {path:'ccmWelcome',component:CcmWelcomeComponent,canActivate:[RouteguradServiceService]}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
