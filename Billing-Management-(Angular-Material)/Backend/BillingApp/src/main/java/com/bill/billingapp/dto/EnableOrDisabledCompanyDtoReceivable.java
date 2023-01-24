package com.bill.billingapp.dto;

import java.util.List;

import com.bill.billingapp.entity.Company;

public class EnableOrDisabledCompanyDtoReceivable {
	private Company company;
	private List<CompanyUserDtoReceivable> users;
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	public List<CompanyUserDtoReceivable> getUsers() {
		return users;
	}
	public void setUsers(List<CompanyUserDtoReceivable> users) {
		this.users = users;
	}
	
	
	
}
