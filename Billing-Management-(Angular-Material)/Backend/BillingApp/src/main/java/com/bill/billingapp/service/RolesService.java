package com.bill.billingapp.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import com.bill.billingapp.entity.Roles;
import com.bill.billingapp.entity.User;
import com.bill.billingapp.repository.RolesRepo;
import com.bill.billingapp.repository.UserRepo;
import com.bill.billingapp.utilities.CommonResponse;


@Service
public class RolesService {

	@Autowired
	RolesRepo rolesRepo;

//	public void createRoles(List<Roles> roles) {
//		
//		try {
//			rolesRepo.saveAll(roles);
//			response = new CommonResponseFailure("success", 201);
//			return response;
//		} catch (Exception ex) {
//			response = new CommonResponseFailure("failure", 500);
//			return response;
//		}
//
//	}
	
	@PostConstruct
	public void roleInit() {
		try {
		List<Roles> list = new ArrayList<>();
		Iterable<Roles> roles = rolesRepo.findAll();

		for (Roles r : roles) {
			list.add(r);
		}

		if (list.isEmpty() || list == null) {
			Roles role1= new Roles();
			Roles role2= new Roles();
			Roles role3= new Roles();
			Roles role4= new Roles();
			Roles role5= new Roles();
			Roles role6= new Roles();
			
			role1.setCompanyType("Admin");
			role1.setRoleId(1);
			role1.setRoleName("Admin");
			
			role2.setCompanyType("Vendor");
			role2.setRoleId(2);
			role2.setRoleName("Vendor Contract Manager");
			
			role3.setCompanyType("Vendor");
			role3.setRoleId(3);
			role3.setRoleName("Account Receivable");
			
			role4.setCompanyType("Client");
			role4.setRoleId(4);
			role4.setRoleName("Client Contract Manager");
			
			role5.setCompanyType("Client");
			role5.setRoleId(5);
			role5.setRoleName("Client Program Manager");
			
			role6.setCompanyType("Client");
			role6.setRoleId(6);
			role6.setRoleName("Account Payable");
			
			
			list.add(role1);
			list.add(role2);
			list.add(role3);
			list.add(role4);
			list.add(role5);
			list.add(role6);
			
			rolesRepo.saveAll(list);
		}
		
		}catch (Exception e) {
			e.printStackTrace();
		}
//		List<Roles> list = new ArrayList<>();
//		Iterable<Roles> roles = rolesRepo.findAll();
//
//		for (Roles r : roles) {
//			list.add(r);
//		}
//		
	}

	public CommonResponse getAllRoles() {
		try {
			List<Roles> list = new ArrayList<>();
			Iterable<Roles> roles = rolesRepo.findAll();

			for (Roles r : roles) {
				list.add(r);
			}

			if (!list.isEmpty() && list != null) {
				return new CommonResponse<List<Roles>>(list, 200);
			}

			return new CommonResponse<String>("No Roles Present", 404);

		} catch (Exception ex) {
			return new CommonResponse<String>(ex.getMessage(), 500);
		}

	}

	public CommonResponse getRolesByCompanyType(String ctype) {
		try {
			List<Roles> list= rolesRepo.findByCompanyType(ctype);

			

			if (!list.isEmpty() && list != null) {
				return new CommonResponse<List<Roles>>(list, 200);
			}

			return new CommonResponse<String>("No " +ctype + " Roles Present", 404);

		} catch (Exception ex) {
			return new CommonResponse<String>(ex.getMessage(), 500);
		}

	}
	
	public List<Roles> fetchRoles(String role){
		List<Roles> roles = rolesRepo.findByCompanyType(role);
		return roles;
		
	}

}
