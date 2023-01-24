package com.bill.billingapp.utilities;

import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.stereotype.Component;

import com.bill.billingapp.entity.Company;
import com.bill.billingapp.entity.CompanyUser;
import com.bill.billingapp.entity.Contract;
import com.bill.billingapp.entity.Status;

@Component
public class ContractSender {
	private long contractId;
	private Company companyVendor;
	private Company companyClient;
	private CompanyUser contractRaisedby;
	private CompanyUser contractApprovedBy;
	private String fromDate;
	private String toDate;
	private Status status;
	private Double amount;
	
	public ContractSender() {
		// TODO Auto-generated constructor stub
	}
	public ContractSender (Contract contract) {
		this.contractId=contract.getContractId();
		this.companyVendor = contract.getCompanyVendor();
		this.companyClient = contract.getCompanyClient();
		this.contractRaisedby = contract.getContractRaisedby();
		this.contractApprovedBy = contract.getContractApprovedBy();
		LocalDateTime fromDate= contract.getFromDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
		this.fromDate = fromDate.toLocalDate().toString();
		LocalDateTime toDate= contract.getToDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
		this.toDate = toDate.toLocalDate().toString();
		this.status = contract.getStatus();
		this.amount = Double.valueOf(contract.getAmount());
	}


	public long getContractId() {
		return contractId;
	}


	public void setContractId(long contractId) {
		this.contractId = contractId;
	}


	public Company getCompanyVendor() {
		return companyVendor;
	}


	public void setCompanyVendor(Company companyVendor) {
		this.companyVendor = companyVendor;
	}


	public Company getCompanyClient() {
		return companyClient;
	}


	public void setCompanyClient(Company companyClient) {
		this.companyClient = companyClient;
	}


	public CompanyUser getContractRaisedby() {
		return contractRaisedby;
	}


	public void setContractRaisedby(CompanyUser contractRaisedby) {
		this.contractRaisedby = contractRaisedby;
	}


	public CompanyUser getContractApprovedBy() {
		return contractApprovedBy;
	}


	public void setContractApprovedBy(CompanyUser contractApprovedBy) {
		this.contractApprovedBy = contractApprovedBy;
	}


	public String getFromDate() {
		return fromDate;
	}


	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}


	public String getToDate() {
		return toDate;
	}


	public void setToDate(String toDate) {
		this.toDate = toDate;
	}


	public Status getStatus() {
		return status;
	}


	public void setStatus(Status status) {
		this.status = status;
	}


	public double getAmount() {
		return amount;
	}


	public void setAmount(double amount) {
		this.amount = amount;
	}


}
