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

import com.bill.billingapp.dto.InvoiceDto;
import com.bill.billingapp.dto.InvoiceListDisplayDto;
import com.bill.billingapp.entity.Invoice;
import com.bill.billingapp.entity.Status;
import com.bill.billingapp.service.InvoiceService;
import com.bill.billingapp.utilities.CommonResponse;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/invoice")
public class InvoiceController {

	@Autowired
	InvoiceService invoiceService;

	@PostMapping("/createInvoice")
	private CommonResponse createInovice(@RequestBody InvoiceDto dto) {
		return invoiceService.createInvoice(dto);
	}
	
	@GetMapping("/update/{invoiceId}/{userId}")
	private CommonResponse updateInovice(@PathVariable String invoiceId, @PathVariable String userId ) {
		return invoiceService.changeInvoiceStatus(Long.parseLong(invoiceId), Long.parseLong(userId));
	}
	
	@GetMapping("/pending/{companyId}")
	private CommonResponse pendingInovice(@PathVariable String companyId) {
		return invoiceService.findInvoicesByCompanyAndStatus(Long.parseLong(companyId), Status.PENDING);
	}
	
	@GetMapping("/approved/{companyId}")
	private CommonResponse approvedInovice(@PathVariable String companyId) {
		return invoiceService.findInvoicesByCompanyAndStatus(Long.parseLong(companyId), Status.APPROVED);
	}
	
	@GetMapping("/reviewed/{companyId}")
	private CommonResponse reviewedInovice(@PathVariable String companyId) {
		return invoiceService.findInvoicesByCompanyAndStatus(Long.parseLong(companyId), Status.REVIEWED);
	}
	
	@GetMapping("/paid/{companyId}")
	private CommonResponse paidInovice(@PathVariable String companyId) {
		return invoiceService.findInvoicesByCompanyAndStatus(Long.parseLong(companyId), Status.PAID);
	}
	
}
