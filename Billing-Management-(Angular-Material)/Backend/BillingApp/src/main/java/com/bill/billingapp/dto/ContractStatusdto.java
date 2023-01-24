package com.bill.billingapp.dto;

import java.util.Date;

public class ContractStatusdto {
	private long contractId;
    private String companyVendor;
    private String companyClient;
    private double amount;
    private String contractRaisedBy;
    private Date fromDate;
    private Date toDate;
    private String status;
    private double balance;
	public long getContractId() {
		return contractId;
	}
	public void setContractId(long contractId) {
		this.contractId = contractId;
	}
	public String getCompanyVendor() {
		return companyVendor;
	}
	public void setCompanyVendor(String companyVendor) {
		this.companyVendor = companyVendor;
	}
	public String getCompanyClient() {
		return companyClient;
	}
	public void setCompanyClient(String companyClient) {
		this.companyClient = companyClient;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public String getContractRaisedBy() {
		return contractRaisedBy;
	}
	public void setContractRaisedBy(String contractRaisedBy) {
		this.contractRaisedBy = contractRaisedBy;
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
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	} 
	
}
