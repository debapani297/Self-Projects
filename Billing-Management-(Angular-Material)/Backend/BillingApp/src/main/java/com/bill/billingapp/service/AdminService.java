package com.bill.billingapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bill.billingapp.dto.AdminDto;
import com.bill.billingapp.entity.Roles;
import com.bill.billingapp.entity.Status;
import com.bill.billingapp.entity.User;
import com.bill.billingapp.repository.RolesRepo;
import com.bill.billingapp.repository.UserRepo;
import com.bill.billingapp.utilities.CommonResponse;

@Service
public class AdminService {
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private RolesRepo rolesRepo;
	
	public CommonResponse findByUserName(String userName){
		try {
			 User admin=userRepo.findByUserName(userName);
			if(admin!=null) {
				return new CommonResponse<User>(admin, 200);
			}
			return new CommonResponse<String>("User Not Found", 404);
			
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}
	
	public CommonResponse getAllAdmins(){
		try {
			 Roles roles=rolesRepo.findByRoleName("Admin");
			 List<User> admins=userRepo.findByRoles(roles);
			if(!admins.isEmpty() && admins!=null) {
				return new CommonResponse<List<User>>(admins, 200);
			}
			return new CommonResponse<String>("No Admins Present", 404);
			
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}
	
	public CommonResponse createadmin(AdminDto ad) {
		
		try {
			User admin=new User();
			admin.setPassword(ad.getPassword());
			admin.setUserName(ad.getUserName());
			admin.setStatus(Status.ACTIVE);
			
			Optional<Roles> roles=rolesRepo.findById(ad.getRoleId());
			Roles role=roles.get();
			admin.setRoles(role);
			
			userRepo.save(admin);
			CommonResponse<User> commonresponse=new CommonResponse<User>(admin, 201);
			return commonresponse;
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}
	

}
