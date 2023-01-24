package com.bill.billingapp.dto;

import java.util.Date;

import com.bill.billingapp.entity.CompanyUser;
import com.bill.billingapp.entity.Invoice;
import com.bill.billingapp.entity.Status;

public class PaymentDisplayDto {
	private long paymentId;
	private Date dueDate;
	private String paidByAccountPayable;
	private String status;
	private String vendor;
	private String client;
	private double amount;
	private long invoiceId;
	private long contractId;
	public long getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(long paymentId) {
		this.paymentId = paymentId;
	}
	
	public String getPaidByAccountPayable() {
		return paidByAccountPayable;
	}
	public void setPaidByAccountPayable(String paidByAccountPayable) {
		this.paidByAccountPayable = paidByAccountPayable;
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
	public long getInvoiceId() {
		return invoiceId;
	}
	public void setInvoiceId(long invoiceId) {
		this.invoiceId = invoiceId;
	}
	public long getContractId() {
		return contractId;
	}
	public void setContractId(long contractId) {
		this.contractId = contractId;
	}
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	public String getVendor() {
		return vendor;
	}
	public void setVendor(String vendor) {
		this.vendor = vendor;
	}
	public String getClient() {
		return client;
	}
	public void setClient(String client) {
		this.client = client;
	}
}
