package com.bill.billingapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bill.billingapp.dto.ContractStatusdto;
import com.bill.billingapp.dto.InvoiceDto;
import com.bill.billingapp.dto.InvoiceListDisplayDto;
import com.bill.billingapp.dto.PaymentDto;
import com.bill.billingapp.entity.Company;
import com.bill.billingapp.entity.CompanyUser;
import com.bill.billingapp.entity.Contract;
import com.bill.billingapp.entity.Invoice;
import com.bill.billingapp.entity.Status;
import com.bill.billingapp.entity.User;
import com.bill.billingapp.repository.CompanyRepo;
import com.bill.billingapp.repository.CompanyUserRepo;
import com.bill.billingapp.repository.ContractRepo;
import com.bill.billingapp.repository.InvoiceRepo;
import com.bill.billingapp.utilities.CommonResponse;

@Service
public class InvoiceService {

	@Autowired
	private InvoiceRepo invoiceRepo;
	
	@Autowired
	private CompanyRepo companyRepo;
	@Autowired
	private CompanyUserRepo companyUserRepo;
	@Autowired
	private ContractRepo contractRepo;
	@Autowired
	PaymentService paymentService;
	public CommonResponse createInvoice(InvoiceDto invoiceDto) {
		
		try {
			Invoice invoice=new Invoice();
			Company companyClient=companyRepo.findById(invoiceDto.getCompanyClient()).get();
			Company companyVendor=companyRepo.findById(invoiceDto.getCompanyVendor()).get();
			
			//CompanyUser contractApprovedByCPM=companyUserRepo.findById(invoiceDto.getContractApprovedByCPM()).get();
			//CompanyUser contractApprovedByCCM=companyUserRepo.findById(invoiceDto.getContractApprovedByCCM()).get();
			CompanyUser contractRaisedBy=companyUserRepo.findById(invoiceDto.getContractRaisedby()).get();
			
			Contract contract=contractRepo.findById(invoiceDto.getContractId()).get();
			
			invoice.setAmount(invoiceDto.getAmount());
			//invoice.setApprovedByClientProgramManager(contractApprovedByCPM);
			//invoice.setApprovedByClientContractManager(contractApprovedByCCM);
			invoice.setCompanyClient(companyClient);
			invoice.setCompanyVendor(companyVendor);
			invoice.setContract(contract);
			invoice.setCreationDate(invoiceDto.getFromDate()); 
			invoice.setInvoiceRaisedBy(contractRaisedBy);
			invoice.setStatus(Status.PENDING);
			invoice.setDueDate(invoiceDto.getToDate());   
	        
			invoiceRepo.save(invoice);
			
			return new CommonResponse<Invoice>(invoice, 201);
			
		} catch (Exception e) {
			return new CommonResponse<String>(e.getMessage(), 500);
		}
		
		
	}
	
//	public CommonResponse checkInvoicesForContractDeletion(Long companyId, Status status) {
//		
//		try {
//			List<InvoiceListDisplayDto> invoiceDisplay=new ArrayList<InvoiceListDisplayDto>();
//			Optional<Company> company= companyRepo.findById(companyId);
//			if(company.isPresent()) {
//				
//				List<Invoice> invoiceList = null;
//				
//				if(company.get().getCompanyType().equalsIgnoreCase("Vendor")) {
//					
//					invoiceList= invoiceRepo.findAllByCompanyVendor(company.get());
//					
//				}
//				else if(company.get().getCompanyType().equalsIgnoreCase("Client")) {
//				
//					invoiceList= invoiceRepo.findAllByCompanyClient(company.get());
//					
//				}
//				
//				if(!invoiceList.isEmpty() && invoiceList!=null) {
//					invoiceList= invoiceList.stream().filter(invoice -> invoice.getStatus().equals(status)).collect(Collectors.toList());
//					if(!invoiceList.isEmpty() && invoiceList!=null) {
//						for(Invoice i:invoiceList) {
//							InvoiceListDisplayDto i2=new InvoiceListDisplayDto();
//							i2.setInvoiceId(i.getInvoiceId());
//							i2.setContractId(i.getContract().getContractId());
//							i2.setInvoiceAmount(i.getAmount());
//							i2.setDueDate(i.getDueDate());
//							i2.setCompanyVendor(i.getCompanyVendor().getCompanyName());
//							i2.setCompanyClient(i.getCompanyClient().getCompanyName());
//							i2.setInvoiceRaisedBy(i.getInvoiceRaisedBy().getName());
//							i2.setStatus(i.getStatus().toString());
//							invoiceDisplay.add(i2);
//						}
//						return new CommonResponse<List<InvoiceListDisplayDto>>(invoiceDisplay, 200);
//					}
//					
//					
//						
//						
//				}
//				return new CommonResponse<String>("No Invoice Present", 404);
//				
//			}
//			return new CommonResponse<String>("Company not Present", 404);
//			
//		} catch (Exception e) {
//			return new CommonResponse<String> (e.getMessage(), 500);
//		}
//		//return null;
//	}
	
	
	//========================
	
	public CommonResponse checkInvoicesToCloseContract(long contractId) {
		
		try {
				Contract contract= contractRepo.findById(contractId).get();
				List<Invoice> invoiceList= invoiceRepo.findAllByContract(contract);
				
				if(!invoiceList.isEmpty() && invoiceList!=null) {
					invoiceList= invoiceList.stream().filter(invoice -> !(invoice.getStatus().equals(Status.PAID))).collect(Collectors.toList());
					return new CommonResponse<Long>((long) invoiceList.size(), 200);	
				}
				return new CommonResponse<Long>((long)0, 200);
				
			
		} catch (Exception e) {
			return new CommonResponse<String> (e.getMessage(), 500);
		}
	}
	
	//========================
	
	
	public CommonResponse findInvoicesByCompanyAndStatus(Long companyId, Status status) {
		
		try {
			List<InvoiceListDisplayDto> invoiceDisplay=new ArrayList<InvoiceListDisplayDto>();
			Optional<Company> company= companyRepo.findById(companyId);
			if(company.isPresent()) {
				
				List<Invoice> invoiceList = null;
				
				if(company.get().getCompanyType().equalsIgnoreCase("Vendor")) {
					
					invoiceList= invoiceRepo.findAllByCompanyVendor(company.get());
					
				}
				else if(company.get().getCompanyType().equalsIgnoreCase("Client")) {
				
					invoiceList= invoiceRepo.findAllByCompanyClient(company.get());
					
				}
				
				if(!invoiceList.isEmpty() && invoiceList!=null) {
					invoiceList= invoiceList.stream().filter(invoice -> invoice.getStatus().equals(status)).collect(Collectors.toList());
					if(!invoiceList.isEmpty() && invoiceList!=null) {
						for(Invoice i:invoiceList) {
							InvoiceListDisplayDto i2=new InvoiceListDisplayDto();
							i2.setInvoiceId(i.getInvoiceId());
							i2.setContractId(i.getContract().getContractId());
							i2.setInvoiceAmount(i.getAmount());
							i2.setDueDate(i.getDueDate());
							i2.setCompanyVendor(i.getCompanyVendor().getCompanyName());
							i2.setCompanyClient(i.getCompanyClient().getCompanyName());
							i2.setInvoiceRaisedBy(i.getInvoiceRaisedBy().getName());
							i2.setStatus(i.getStatus().toString());
							invoiceDisplay.add(i2);
						}
						return new CommonResponse<List<InvoiceListDisplayDto>>(invoiceDisplay, 200);
					}
					
					
						
						
				}
				return new CommonResponse<String>("No Invoice Present", 404);
				
			}
			return new CommonResponse<String>("Company not Present", 404);
			
		} catch (Exception e) {
			return new CommonResponse<String> (e.getMessage(), 500);
		}
		//return null;
	}

public CommonResponse changeInvoiceStatus(Long invoiceId, Long userId) {
	
	try {
		Optional<Invoice> invoice= invoiceRepo.findById(invoiceId);
		Contract c= invoice.get().getContract();
		
		if(invoice.isPresent()) {
			
			Optional<CompanyUser> user = companyUserRepo.findById(userId);
			if(user.isPresent()) {
				
				if(user.get().getRoles().getRoleId()==4) {
					invoice.get().setStatus(Status.APPROVED);
					invoice.get().setApprovedByClientContractManager(user.get());
					
					PaymentDto paymentDto= new PaymentDto();
					paymentDto.setAmount(invoice.get().getAmount());
					paymentDto.setInvoiceId(invoiceId);
					paymentDto.setStatus(Status.PAYMENT_PENDING.toString());
					paymentService.createPayment(paymentDto);
					
				}
				else if(user.get().getRoles().getRoleId()==5) {
					
					invoice.get().setStatus(Status.REVIEWED);
					invoice.get().setApprovedByClientProgramManager(user.get());
					
				}
				else if(user.get().getRoles().getRoleId()==6) {
					
					double balance=c.getBalance();
					balance=c.getBalance()-invoice.get().getAmount();
					c.setBalance(balance);
					invoice.get().setStatus(Status.PAID);
					invoice.get().getContract().setBalance(balance);
					
					
					
				}
				
				Invoice updatedInvoice = invoiceRepo.save(invoice.get());
				
				return new CommonResponse<Invoice>(updatedInvoice, 201);
				
			}
			
		}
		
	} catch (Exception e) {
		return new CommonResponse<String>(e.getMessage(), 500);
	}
	return null;
}

	
}
