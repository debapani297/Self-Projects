package com.bill.billingapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bill.billingapp.entity.Roles;
import com.bill.billingapp.service.RolesService;
import com.bill.billingapp.utilities.CommonResponse;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RolesController {

	@Autowired
	RolesService rolesService;
	
//	@PostMapping(value="/save")
//	public CommonResponseFailure createRoles(@RequestBody List<Roles> roles) {
//		
//		CommonResponseFailure response=rolesService.createRoles(roles);
//		return response;
//	}
	
	@GetMapping("/roles")
	public CommonResponse getAllRoles(){
		return rolesService.getAllRoles();
		
	}
	@GetMapping("/roles/{ctype}")
	public CommonResponse getRolesByCompanyType(@PathVariable String ctype){
		return rolesService.getRolesByCompanyType(ctype);
		
	}
//	
//	@GetMapping("/Allroles/{ctype}")
//	public List<Roles> getAllRoles(@PathVariable String ctype){
//		return rolesService.fetchRoles(ctype);
//	}
	
}
