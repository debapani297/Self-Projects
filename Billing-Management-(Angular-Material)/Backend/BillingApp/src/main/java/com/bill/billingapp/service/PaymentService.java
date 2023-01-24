package com.bill.billingapp.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.bill.billingapp.dto.ContractStatusdto;
import com.bill.billingapp.dto.InvoiceDto;
import com.bill.billingapp.dto.PaymentDisplayDto;
import com.bill.billingapp.dto.PaymentDto;
import com.bill.billingapp.entity.Company;
import com.bill.billingapp.entity.CompanyUser;
import com.bill.billingapp.entity.Contract;
import com.bill.billingapp.entity.Invoice;
import com.bill.billingapp.entity.Payment;
import com.bill.billingapp.entity.Status;
import com.bill.billingapp.entity.User;
import com.bill.billingapp.repository.CompanyRepo;
import com.bill.billingapp.repository.CompanyUserRepo;
import com.bill.billingapp.repository.ContractRepo;
import com.bill.billingapp.repository.InvoiceRepo;
import com.bill.billingapp.repository.PaymentRepo;
import com.bill.billingapp.utilities.CommonResponse;

@Service
public class PaymentService {

	@Autowired
	private PaymentRepo paymentRepo;
	
	@Autowired
	private InvoiceRepo invoiceRepo;
	
	@Autowired
	private CompanyRepo companyRepo;
	@Autowired
	private CompanyUserRepo companyUserRepo;
	@Autowired  
	@Lazy
	InvoiceService invoiceService;    
	
	public Payment createPayment(PaymentDto paymentDto) {
		
		try {
			Payment payment= new Payment();
			Invoice invoice=invoiceRepo.findById(paymentDto.getInvoiceId()).get();
			
			payment.setAmount(paymentDto.getAmount());
			payment.setInvoiceId(invoice);
			payment.setStatus(Status.PAYMENT_PENDING);
			
			
	        
			paymentRepo.save(payment);
			
			return payment;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;		
	}
	
	
	public CommonResponse pay(Long paymentId, Long userId) {
		
		try {
			Optional<Payment> payment= paymentRepo.findById(paymentId);
			
			if(payment.isPresent()) {
				
				Optional<CompanyUser> user = companyUserRepo.findById(userId);
				if(user.isPresent()) {
						payment.get().setStatus(Status.PAID);
						payment.get().setPaidByAccountPayable(user.get());		
						payment.get().setPayDate(new Date());
					
					
						Payment updatedPayment = paymentRepo.save(payment.get());
						invoiceService.changeInvoiceStatus(payment.get().getInvoiceId().getInvoiceId(), user.get().getUserId());
						
						return new CommonResponse<Payment>(updatedPayment, 201);
					
				}
				
			}
			
		} catch (Exception e) {
			return new CommonResponse<String>(e.getMessage(), 500);
		}
		return null;
	}
	
	
	private List<Payment>  paymentList = new ArrayList<>();
	private List<PaymentDisplayDto>  dtoList = new ArrayList<>();
	
	public CommonResponse findPaymentsByCompanyAndStatus(Long companyId, Status status) {
		
		try {
			Optional<Company> company= companyRepo.findById(companyId);
			if(company.isPresent()) {
				
				Iterable<Payment> payments = paymentRepo.findAll();
				
				paymentList.clear();
				
				payments.forEach(payment -> {
					if(payment.getInvoiceId().getCompanyClient()==company.get()) {
						paymentList.add(payment);
					}
				});
				
				if(!paymentList.isEmpty() && paymentList!=null) {
					paymentList= paymentList.stream().filter(invoice -> invoice.getStatus().equals(status)).collect(Collectors.toList());
					if(!paymentList.isEmpty() && paymentList!=null) {
						
						dtoList.clear();
						
						for(Payment p:paymentList) {
							PaymentDisplayDto pd=new PaymentDisplayDto();
							pd.setInvoiceId(p.getInvoiceId().getInvoiceId());
							pd.setContractId(p.getInvoiceId().getContract().getContractId());
							pd.setVendor(p.getInvoiceId().getContract().getCompanyVendor().getCompanyName());
							pd.setClient(p.getInvoiceId().getContract().getCompanyClient().getCompanyName());
							pd.setDueDate(p.getInvoiceId().getDueDate());
							//pd.setPaidByAccountPayable(p.getPaidByAccountPayable().getUserName());
							pd.setAmount(p.getAmount());
							pd.setStatus(p.getStatus().toString());
							pd.setPaymentId(p.getPaymentId());
							dtoList.add(pd);
						}
						return new CommonResponse<List<PaymentDisplayDto>>(dtoList, 200);
					}
						
						
						
				}
				return new CommonResponse<String>("No Payments Available", 404);
				
			}
			return new CommonResponse<String>("No Company Present", 404);
			
		} catch (Exception e) {
			return new CommonResponse<String>(e.getMessage(), 500);
		}
		
	}


	@Override
	public String toString() {
		return "PaymentService [paymentRepo=" + paymentRepo + ", invoiceRepo=" + invoiceRepo + ", companyRepo="
				+ companyRepo + ", companyUserRepo=" + companyUserRepo + ", invoiceService=" + invoiceService
				+ ", paymentList=" + paymentList + ", dtoList=" + dtoList + "]";
	}
	
	
	
	
}
