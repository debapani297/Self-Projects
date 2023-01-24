package com.bill.billingapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bill.billingapp.dto.ContractDto;
import com.bill.billingapp.entity.Contract;
import com.bill.billingapp.service.ContractService;
import com.bill.billingapp.utilities.CommonResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/contract")
public class ContractController {

	@Autowired
	ContractService contractService;
	
	@PostMapping("/create")
	private CommonResponse createContract(@RequestBody ContractDto contractDto) {
		return contractService.createContract(contractDto);
	}
	
	@GetMapping("/pending/vendor/{companyId}")
	private CommonResponse findByVendorPending(@PathVariable String companyId) {
		return contractService.findByVendorPending(Long.parseLong(companyId));
	}
	
	@GetMapping("/approved/vendor/{companyId}")
	private CommonResponse findByVendorApproved(@PathVariable String companyId) {
		return contractService.findByVendorApproved(Long.parseLong(companyId));
	}
	
	@GetMapping("/pending/client/{companyId}")
	private CommonResponse findByClientPending(@PathVariable String companyId) {
		return contractService.findByClientPending(Long.parseLong(companyId));
	}
	
	@GetMapping("/approved/client/{companyId}")
	private CommonResponse findByClientApproved(@PathVariable String companyId) {
		return contractService.findByClientApproved(Long.parseLong(companyId));
	}
	
	@GetMapping("/accept/{contractId}/{userId}")
	private CommonResponse findByClientApproved(@PathVariable String contractId,@PathVariable String userId) {
		return contractService.approveContract(Long.parseLong(contractId), Long.parseLong(userId));
	}
	
	@GetMapping("/getContractById/{contractId}")
	private CommonResponse findContractByContractId(@PathVariable String contractId) {
		return contractService.findContractByContractId(Long.parseLong(contractId));
	}
}
