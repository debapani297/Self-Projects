package com.bill.billingapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bill.billingapp.entity.Company;
import com.bill.billingapp.entity.Status;
import com.bill.billingapp.repository.CompanyRepo;
import com.bill.billingapp.service.CompanyService;
import com.bill.billingapp.utilities.CommonResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyController {

	@Autowired
	CompanyService companyService;
	
	@PostMapping("/company/register")
	public CommonResponse createCompany(@RequestBody Company company) {
		return companyService.createCompany(company);
	}
	
	@GetMapping("/company/{status}")
	public CommonResponse getCompanies(@PathVariable String status) {
		return companyService.getAllcompanies(Status.valueOf(status));
	}
	
	@GetMapping("/company/disable/{companyId}")
	public CommonResponse disableCompany(@PathVariable String companyId) {
		return companyService.disableCompany(Long.parseLong(companyId));
	}
	
	@GetMapping("/company/enable/{companyId}")
	public CommonResponse enableCompany(@PathVariable String companyId) {
		return companyService.enableCompany(Long.parseLong(companyId));
	}
	
	@GetMapping("/getAllClients")
	public CommonResponse getAllClients() {
		return companyService.getAllClients();
	}
	
	@GetMapping("/getAllVendors")
	public CommonResponse getAllVendors() {
		return companyService.getAllVendors();
	}
	
}
