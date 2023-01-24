package com.bill.billingapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bill.billingapp.dto.AdminDto;
import com.bill.billingapp.service.AdminService;
import com.bill.billingapp.utilities.CommonResponse;

@RestController
@CrossOrigin

public class AdminController {
	@Autowired
	AdminService adminService;
	
	@GetMapping("/admin/auth/{userName}")
	public CommonResponse authAdmin(@PathVariable String userName) {
		
		return adminService.findByUserName(userName);
		
	}
	
//	@GetMapping("/admin/auth/{userName}")
//	public String authAdmin(@PathVariable String userName) {
//		
//		CommonResponse response= adminService.findByUserName(userName);
//		System.out.println(response.toString());
//		return response.toString();
//		
//	}
	
	@GetMapping("/admin/auth/all")
	public CommonResponse allAdmin() {
		
		return adminService.getAllAdmins();
		
	}
	
	@PostMapping("/admin/auth")
	public CommonResponse createAdmin(@RequestBody AdminDto ad) {
		return adminService.createadmin(ad);
	}

	

}
