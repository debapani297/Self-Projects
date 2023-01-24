package com.bill.billingapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bill.billingapp.dto.CompanyUserDto;
import com.bill.billingapp.entity.Company;
import com.bill.billingapp.entity.CompanyUser;
import com.bill.billingapp.entity.Roles;
import com.bill.billingapp.entity.Status;
import com.bill.billingapp.repository.CompanyRepo;
import com.bill.billingapp.repository.CompanyUserRepo;
import com.bill.billingapp.repository.RolesRepo;
import com.bill.billingapp.utilities.CommonResponse;

@Service
public class UserService {
	@Autowired
	private CompanyUserRepo companyUserRepo;
	
	@Autowired
	CompanyRepo companyRepo;
	
	@Autowired
	RolesRepo rolesRepo;
	
	public CommonResponse createUser(CompanyUserDto companyUserDto) {
		try {
			
			CompanyUser user=new CompanyUser();
			user.setPassword(companyUserDto.getPassword());
			user.setUserName(companyUserDto.getUserName());
			
			Optional<Roles> roles=rolesRepo.findById(companyUserDto.getRoleId());
			Roles roleId=roles.get();
			
			Company company=companyRepo.findById(companyUserDto.getCompanyId()).get();
			
			user.setCompany(company);
			user.setRoles(roleId);
			user.setStatus(Status.ACTIVE);
			
			companyUserRepo.save(user);
			
			return new CommonResponse<CompanyUser>(user, 201);
			
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
	}
	
	
	public CommonResponse getAllUsers(){
		try {
			 Roles vroles=rolesRepo.findByRoleName("Vendor");
			 List<CompanyUser> vendors=companyUserRepo.findByRoles(vroles);
			 
			 Roles croles=rolesRepo.findByRoleName("Client");
			 List<CompanyUser> clients=companyUserRepo.findByRoles(croles);
			 
			 vendors.addAll(clients);
			 
			if(!vendors.isEmpty() && vendors!=null) {
				return new CommonResponse<List<CompanyUser>>(vendors, 200);
			}
			return new CommonResponse<String>("No Admins Present", 404);
			
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}
	

}
