package com.bill.billingapp.dto;

import java.util.Date;

public class InvoiceListDisplayDto {
	private long invoiceId;
	private String companyVendor;
	private String companyClient;
	private double invoiceAmount;
	private Date dueDate;
	private long contractId;
	private String invoiceRaisedBy;
	private String status;
	public long getInvoiceId() {
		return invoiceId;
	}
	public void setInvoiceId(long invoiceId) {
		this.invoiceId = invoiceId;
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
	public double getInvoiceAmount() {
		return invoiceAmount;
	}
	public void setInvoiceAmount(double invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	public long getContractId() {
		return contractId;
	}
	public void setContractId(long contractId) {
		this.contractId = contractId;
	}
	public String getInvoiceRaisedBy() {
		return invoiceRaisedBy;
	}
	public void setInvoiceRaisedBy(String invoiceRaisedBy) {
		this.invoiceRaisedBy = invoiceRaisedBy;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
