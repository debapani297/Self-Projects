
package com.bill.billingapp.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "company")
public class Company {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="company_id")
	private long companyId;
	
	@Column
	private String companyName;
	
	@Column(name="company_location")
	private String companyLocation;
	@Column(name="company_type")
	private String companyType;

	@Enumerated(EnumType.STRING)
	protected Status status;

	
//	@OneToMany(mappedBy="company")
//	private List<CompanyUser> user;
	
	public Status getStatus() {
		return status;
	}

	public void setStatus(Status inActive) {
		this.status = inActive;
	}

	public String getCompanyLocation() {
		return companyLocation;
	}

	public void setCompanyLocation(String companyLocation) {
		this.companyLocation = companyLocation;
	}

	public String getCompanyType() {
		return companyType;
	}

	public void setCompanyType(String companyType) {
		this.companyType = companyType;
	}

	public long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

//	public List<CompanyUser> getUser() {
//		return user;
//	}
//
//	public void setUser(List<CompanyUser> user) {
//		this.user = user;
//	}
	
	

}
