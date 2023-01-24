
package com.bill.billingapp.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "contract")
public class Contract {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "contract_id")
	private long contractId;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "company_vendor", referencedColumnName = "company_id")
	private Company companyVendor;
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "company_client", referencedColumnName = "company_id")
	private Company companyClient;
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "contract_raised_by", referencedColumnName = "user_id")
	private CompanyUser contractRaisedby;
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "contract_approved_by", referencedColumnName = "user_id")
	private CompanyUser contractApprovedBy;

	private Date fromDate;
	private Date toDate;
	@Enumerated(EnumType.STRING)
	private Status status;
	private double amount;
	private double balance;

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

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	

}
