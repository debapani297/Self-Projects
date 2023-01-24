package com.bill.billingapp.dto;

import java.util.Date;

public class ContractDto {

	private String companyVendorId;
	private String companyClientId;
	private String contractRaisedById;
	private String contractApprovedById;
	private String status;
	private double amount;
	private Date fromDate;
	private Date toDate;
	
	
	public String getCompanyVendorId() {
		return companyVendorId;
	}
	public void setCompanyVendorId(String companyVendorId) {
		this.companyVendorId = companyVendorId;
	}
	public String getCompanyClientId() {
		return companyClientId;
	}
	public void setCompanyClientId(String companyClientId) {
		this.companyClientId = companyClientId;
	}
	public String getContractRaisedById() {
		return contractRaisedById;
	}
	public void setContractRaisedById(String contractRaisedById) {
		this.contractRaisedById = contractRaisedById;
	}
	public String getContractApprovedById() {
		return contractApprovedById;
	}
	public void setContractApprovedById(String contractApprovedById) {
		this.contractApprovedById = contractApprovedById;
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
	
	
}
