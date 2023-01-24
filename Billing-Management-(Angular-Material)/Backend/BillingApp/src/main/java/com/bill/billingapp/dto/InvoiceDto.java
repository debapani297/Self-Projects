package com.bill.billingapp.dto;

import java.util.Date;

public class InvoiceDto {

	  private long contractId;
	  
	  private long companyVendor;
	  private long companyClient;
	  private long contractRaisedby;
	  private long contractApprovedByCPM;
	  private long contractApprovedByCCM;
	  private Date fromDate;
	  private Date toDate;
	  private String status;
	  private double amount;
	  
	  
	public long getContractId() {
		return contractId;
	}
	public void setContractId(long contractId) {
		this.contractId = contractId;
	}
	public long getCompanyVendor() {
		return companyVendor;
	}
	public void setCompanyVendor(long companyVendor) {
		this.companyVendor = companyVendor;
	}
	public long getCompanyClient() {
		return companyClient;
	}
	public void setCompanyClient(long companyClient) {
		this.companyClient = companyClient;
	}
	public long getContractRaisedby() {
		return contractRaisedby;
	}
	public void setContractRaisedby(long contractRaisedby) {
		this.contractRaisedby = contractRaisedby;
	}
	public long getContractApprovedByCPM() {
		return contractApprovedByCPM;
	}
	public void setContractApprovedByCPM(long contractApprovedByCPM) {
		this.contractApprovedByCPM = contractApprovedByCPM;
	}
	public long getContractApprovedByCCM() {
		return contractApprovedByCCM;
	}
	public void setContractApprovedByCCM(long contractApprovedByCCM) {
		this.contractApprovedByCCM = contractApprovedByCCM;
	}
	public Date getFromDate() {
		return fromDate;
	}
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	public Date getToDate() {
		return toDate;
	}
	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	
	  
																		
	
}
