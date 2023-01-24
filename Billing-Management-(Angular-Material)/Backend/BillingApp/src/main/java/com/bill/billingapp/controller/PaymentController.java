package com.bill.billingapp.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bill.billingapp.dto.PaymentDto;
import com.bill.billingapp.entity.Payment;
import com.bill.billingapp.entity.Status;
import com.bill.billingapp.entity.User;
import com.bill.billingapp.service.PaymentService;
import com.bill.billingapp.utilities.CommonResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/payment")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;
	
	@PostMapping("/create")
	public Payment createPayment(@RequestBody PaymentDto paymentDto) {
		
	    return paymentService.createPayment(paymentDto);
		
	}
	
	@GetMapping("/pay/{paymentId}/{userId}")
	public CommonResponse payPayment(@PathVariable String paymentId,@PathVariable String userId) {
		
	    return paymentService.pay(Long.parseLong(paymentId), Long.parseLong(userId));
		
	}
	
	@GetMapping("/pending/{companyId}")
	public CommonResponse pendingPaymentList(@PathVariable String companyId) {
		
	    return paymentService.findPaymentsByCompanyAndStatus(Long.parseLong(companyId), Status.PAYMENT_PENDING);
		
	}
	
	@GetMapping("/paid/{companyId}")
	public CommonResponse paidPaymentList(@PathVariable String companyId) {
		
	    return paymentService.findPaymentsByCompanyAndStatus(Long.parseLong(companyId), Status.PAID);
		
	}
	
}
