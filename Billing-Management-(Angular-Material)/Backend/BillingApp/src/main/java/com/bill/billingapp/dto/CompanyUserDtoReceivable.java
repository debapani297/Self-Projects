package com.bill.billingapp.dto;

import com.bill.billingapp.entity.Status;

public class CompanyUserDtoReceivable {
		
		private long userId;
	    private String userName;
	    private String name;
	    private long companyId;
	    private String companyName;
	    private String companytype;
	    private String location;
	    private Status status;
	    private String roleName;
	    
	    
	    
		public String getRoleName() {
			return roleName;
		}
		public void setRoleName(String roleName) {
			this.roleName = roleName;
		}
		public Status getStatus() {
			return status;
		}
		public void setStatus(Status status) {
			this.status = status;
		}
		public long getUserId() {
			return userId;
		}
		public void setUserId(long userId) {
			this.userId = userId;
		}
		public String getUserName() {
			return userName;
		}
		public void setUserName(String userName) {
			this.userName = userName;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
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
		public String getCompanytype() {
			return companytype;
		}
		public void setCompanytype(String companytype) {
			this.companytype = companytype;
		}
		public String getLocation() {
			return location;
		}
		public void setLocation(String location) {
			this.location = location;
		}
	    
	}

