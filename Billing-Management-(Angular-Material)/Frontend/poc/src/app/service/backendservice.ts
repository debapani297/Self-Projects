import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CommonResponse } from '../model/CommonResponse';
import { Company } from '../model/Company';
import { Contracts } from '../model/Contracts';
import { companyDto } from '../model/dto/companyDto';
import { CompanyUserDto } from '../model/dto/companyUserDto';
import { ContractDetailsdto } from '../model/dto/contract-detailsdto';
import { ContractDto } from '../model/dto/ContractDto';
import { InvoiceRaisingDto } from '../model/dto/invoice-raising-dto';
import { userDto } from '../model/dto/userDto';
import { Invoice } from '../model/Invoice';
import { Role } from '../model/role';
import { User } from '../model/user';
import { ContractModel } from '../model/contract-model';

@Injectable({
  providedIn: 'root'
})

export class backendService {
  constructor(private router: Router, private http: HttpClient) { }


  getAdmin(userName: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/admin/auth/${userName}`)
  }

  adminReg(admin: userDto) {
    console.log(admin);
    return this.http.post(`http://localhost:8080/admin/auth/`, admin)
  }

  orgReg(org: companyDto) {
    // console.log(org)
    return this.http.post<CommonResponse>(`http://localhost:8080/company/register`, org)
  }

  getCompanies() {
    return this.http.get<CommonResponse>(`http://localhost:8080/company/ACTIVE`)
  }

  getInactiveCompanies() {
    return this.http.get<CommonResponse>(`http://localhost:8080/company/IN_ACTIVE`)
  }

  getRoles(ctype: string) {
    return this.http.get<CommonResponse>(`http://localhost:8080/roles/${ctype}`)
  }

  userReg(user: CompanyUserDto) {
    return this.http.post<CommonResponse>(`http://localhost:8080/user/auth`, user)
  }

  addContract(contractDetails: ContractDetailsdto) {
    return this.http.post<CommonResponse>(`http://localhost:8080/contract/create`, contractDetails)

  }
  getAllClients() {
    return this.http.get<CommonResponse>(`http://localhost:8080/getAllClients`)
  }

  getPendingContract(vendor: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/contract/pending/vendor/${vendor}`);

  }
  getPendingContractClient(client: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/contract/pending/client/${client}`);

  }
  getApprovedContract(vendor: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/contract/approved/vendor/${vendor}`);
  }
  getApprovedContractClient(client: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/contract/approved/client/${client}`);
  }
  getContractByContractId(contractId: string) {
    return this.http.get<CommonResponse>(`http://localhost:8080/contract/getContractById/${contractId}`)
  }

  addInvoice(invoiceDto: InvoiceRaisingDto) {
    return this.http.post<CommonResponse>(`http://localhost:8080/invoice/createInvoice`, invoiceDto)
  }

  getPendingInvoice(companyId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/invoice/pending/${companyId}`)

  }

  getReviewedInvoice(companyId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/invoice/reviewed/${companyId}`)
  }

  getPaidInvoice(companyId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/invoice/paid/${companyId}`)
  }

  getApprovedInvoice(companyId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/invoice/approved/${companyId}`)
  }

  updateInvoiceStatus(invoiceId: any, userId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/invoice/update/${invoiceId}/${userId}`)
  }
  approveContract(contractId: any, userId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/contract/accept/${contractId}/${userId}`)
  }
  getPendingPayments(companyId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/payment/pending/${companyId}`)

  }
  getPaidPayments(companyId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/payment/paid/${companyId}`)

  }
  pay(paymentId: any, userId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/payment/pay/${paymentId}/${userId}`)

  }
  getUsers() {
    return this.http.get<CommonResponse>(`http://localhost:8080/users`)
  }

  allUser() {
    return this.http.get<CommonResponse>(`http://localhost:8080/users`)

  }

  allActiveUser() {
    return this.http.get<CommonResponse>(`http://localhost:8080/users/active`)

  }

  allInactiveUser() {
    return this.http.get<CommonResponse>(`http://localhost:8080/users/inactive`)

  }

  allRegisteredCompanies() {
    return this.http.get<CommonResponse>(`http://localhost:8080/company`)

  }

  disableCompany(companyId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/company/disable/${companyId}`)
  }

  enableCompany(companyId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/company/enable/${companyId}`)
  }

  getAllVendors(){
    return this.http.get<CommonResponse>(`http://localhost:8080/getAllVendors`)
   }

   disableUser(userId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/user/disable/${userId}`)
  }

  enableUser(userId: any) {
    return this.http.get<CommonResponse>(`http://localhost:8080/user/enable/${userId}`)
  }

}