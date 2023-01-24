package com.bill.billingapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bill.billingapp.entity.User;

@RestController
@RequestMapping("/login")
public class LoginController {

//	@Autowired
//	LoginService loginService;
//	
//	@PostMapping
//	public boolean validateUser(@RequestParam("username") String userName,@RequestParam("password") String password,
//			@RequestParam("usertype") String userType) {
//		try {
//			
//	    User user=loginService.validateUser(userName, password, userType);
//			
//		}catch(Exception ex) {
//			
//		}
//		return false;
//	}
}
