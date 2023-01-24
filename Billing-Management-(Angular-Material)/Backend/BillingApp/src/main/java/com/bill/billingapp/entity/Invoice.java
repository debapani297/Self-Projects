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

@Entity
@Table(name = "invoice")
public class Invoice {

	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  @Column(name="invoice_id") 
	  private long invoiceId;
	  
	  @ManyToOne(cascade = CascadeType.ALL)
	  @JoinColumn(name = "company_vendor", referencedColumnName = "company_id")
	  private Company companyVendor;
	  
	  @ManyToOne(cascade = CascadeType.ALL)
	  @JoinColumn(name = "company_client", referencedColumnName = "company_id")
	  private Company companyClient;
	  
	  @ManyToOne(cascade = CascadeType.ALL)
	  @JoinColumn(name = "invoice_raised_by", referencedColumnName = "user_id")
	  private CompanyUser invoiceRaisedBy;
	  
	  @ManyToOne(cascade = CascadeType.ALL)
	  @JoinColumn(name = "approved_by_client_program_manager", referencedColumnName = "user_id")
	  private CompanyUser approvedByClientProgramManager;
	  
	  @ManyToOne(cascade = CascadeType.ALL)
	  @JoinColumn(name = "approved_by_client_contract_manager", referencedColumnName = "user_id")
	  private CompanyUser approvedByClientContractManager;
	  
	  private Date creationDate;
	  private Date dueDate;
	  @Enumerated(EnumType.STRING)
	  private Status status;
	  private double amount;
	  
	  @ManyToOne(cascade = CascadeType.ALL)
	  @JoinColumn(name = "contract_id", referencedColumnName = "contract_id")
	  private Contract contract;

	public long getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(long invoiceId) {
		this.invoiceId = invoiceId;
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

	public CompanyUser getInvoiceRaisedBy() {
		return invoiceRaisedBy;
	}

	public void setInvoiceRaisedBy(CompanyUser invoiceRaisedBy) {
		this.invoiceRaisedBy = invoiceRaisedBy;
	}

	public CompanyUser getApprovedByClientProgramManager() {
		return approvedByClientProgramManager;
	}

	public void setApprovedByClientProgramManager(CompanyUser approvedByClientProgramManager) {
		this.approvedByClientProgramManager = approvedByClientProgramManager;
	}
	
	

	public CompanyUser getApprovedByClientContractManager() {
		return approvedByClientContractManager;
	}

	public void setApprovedByClientContractManager(CompanyUser approvedByClientContractManager) {
		this.approvedByClientContractManager = approvedByClientContractManager;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
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

	public Contract getContract() {
		return contract;
	}

	public void setContract(Contract contract) {
		this.contract = contract;
	}

	
}
