package com.bill.billingapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bill.billingapp.dto.CompanyUserDto;
import com.bill.billingapp.entity.CompanyUser;
import com.bill.billingapp.entity.User;
import com.bill.billingapp.service.CompanyUserService;
import com.bill.billingapp.service.UserService;
import com.bill.billingapp.utilities.CommonResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyUserContoller {

	@Autowired
	CompanyUserService companyUserService;
	
	@PostMapping("/user/auth")
	private CommonResponse createUsers(@RequestBody CompanyUserDto userDto) {
		return companyUserService.createUser(userDto);
		
	}
	
	@GetMapping("/user/auth/{username}")
	private CommonResponse createUsers(@PathVariable String username) {
		return companyUserService.findByUserName(username);
		
	}
	
	@GetMapping("/user/disable/{userId}")
	private CommonResponse disableUser(@PathVariable String userId) {
		return companyUserService.disableUser(Long.parseLong(userId));
	}
	
	@GetMapping("/user/enable/{userId}")
	private CommonResponse enableUser(@PathVariable String userId) {
		return companyUserService.enableUser(Long.parseLong(userId));
	}
	
	@GetMapping("/users")
	private CommonResponse getCompanyUsers(){
		return companyUserService.getCompanyUsers();
	}
	
	@GetMapping("/users/active")
	private CommonResponse getCompanyActiveUsers(){
		return companyUserService.getActiveCompanyUsers();
	}
	
	@GetMapping("/users/inactive")
	private CommonResponse getCompanyInActiveUsers(){
		return companyUserService.getDisableCompanyUsers();
	}
	
//	@PostMapping("user/save")
//	public ResponseEntity<?> saveUser(@RequestBody CompanyUser user){
//		User emp = companyUserService.saveUser(user);
//		return new ResponseEntity<User>(emp, HttpStatus.CREATED);
//	}
//	
	
}
