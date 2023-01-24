package com.bill.billingapp.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.bill.billingapp.dto.CompanyUserDto;
import com.bill.billingapp.dto.CompanyUserDtoReceivable;
import com.bill.billingapp.dto.ContractStatusdto;
import com.bill.billingapp.dto.EnableOrDisabledCompanyDtoReceivable;
import com.bill.billingapp.entity.Company;
import com.bill.billingapp.entity.CompanyUser;
import com.bill.billingapp.entity.Contract;
import com.bill.billingapp.entity.Roles;
import com.bill.billingapp.entity.Status;
import com.bill.billingapp.entity.User;
import com.bill.billingapp.repository.CompanyRepo;
import com.bill.billingapp.utilities.CommonResponse;

@Service
public class CompanyService {
	
	@Autowired
	CompanyRepo companyRepo;
	
	@Lazy
	@Autowired
	ContractService contractService;
	
	@Lazy
	@Autowired
	CompanyUserService companyUserService;
	
	@Lazy
	@Autowired
	InvoiceService invoiceService;
	
	public CommonResponse createCompany(Company comp) {
		try {
			comp.setStatus(Status.ACTIVE);
			Company company= companyRepo.save(comp);
			return new CommonResponse<Company>(company, 201);
		}catch (Exception e) {
			return new CommonResponse<String>(e.getMessage(),500);
		}	
	}
	
	public CommonResponse getAllcompanies(Status status){
		try {
			List<Company> companies =companyRepo.findByStatus(status);
			if(!companies.isEmpty() && companies!=null) {
				return new CommonResponse<List<Company>>(companies, 200);
			}
			return new CommonResponse<String>("No "+ status +" Companies Present", 404);
			
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}
	
	public CommonResponse getAllClients(){
		try {
			List<Company> companies = companyRepo.findByStatus(Status.ACTIVE);
			if(!companies.isEmpty() && companies!=null) {
				companies= companies.stream().filter(company -> (company.getCompanyType().equals("Client"))).collect(Collectors.toList());
				 
				if(!companies.isEmpty() && companies!=null) {
					return new CommonResponse<List<Company>>(companies, 200);
				}
			}
			return new CommonResponse<String>("No Active Client Companies Present", 404);
			
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}
	
	public CommonResponse getAllVendors(){
		
		try {
			List<Company> companies = companyRepo.findByStatus(Status.ACTIVE);
			if(!companies.isEmpty() && companies!=null) {
				companies= companies.stream().filter(company -> (company.getCompanyType().equals("Vendor"))).collect(Collectors.toList());
				 
				if(!companies.isEmpty() && companies!=null) {
					return new CommonResponse<List<Company>>(companies, 200);
				}
			}
			return new CommonResponse<String>("No Active Vendor Companies Present", 404);
			
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}
	
	public CommonResponse enableCompany(long companyId){
		try {
			Optional<Company> company=companyRepo.findById(companyId);
			EnableOrDisabledCompanyDtoReceivable enableOrDisabledCompanyDtoReceivable= new EnableOrDisabledCompanyDtoReceivable();
			 
			if(company.isPresent()) {
				
				company.get().setStatus(Status.ACTIVE);
				Company companyUpdated = companyRepo.save(company.get());
				CommonResponse userListResponse = companyUserService.getCompanyUsers();
				
				if(userListResponse.getStatusCode()==200) {
					
					List<CompanyUserDtoReceivable> users= (List<CompanyUserDtoReceivable>) userListResponse.getResponse();
					List<CompanyUserDtoReceivable> enabledUsers= new ArrayList<CompanyUserDtoReceivable>();
					for (CompanyUserDtoReceivable companyUserDtoReceivable : users) {
						
						CommonResponse userResponse = companyUserService.enableUser(companyUserDtoReceivable.getUserId());
						if(userResponse.getStatusCode()==201)
							enabledUsers.add((CompanyUserDtoReceivable) userResponse.getResponse());
						else if(userResponse.getStatusCode()==403) 
							return userResponse;
						else if (userResponse.getStatusCode()==500)
							return userResponse;
						
					}
					enableOrDisabledCompanyDtoReceivable.setUsers(enabledUsers);
					enableOrDisabledCompanyDtoReceivable.setCompany(companyUpdated);
					
				}
				else if(userListResponse.getStatusCode()==500)
					return userListResponse;
				enableOrDisabledCompanyDtoReceivable.setCompany(companyUpdated);
				return new CommonResponse<EnableOrDisabledCompanyDtoReceivable>(enableOrDisabledCompanyDtoReceivable, 200);   //returns updated Company
				
				
			}
			return new CommonResponse<String>("No Such Company Present", 404);
			
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}
	
	public CommonResponse disableCompany(long companyId){
		try {
			Optional<Company> company=companyRepo.findById(companyId);
			EnableOrDisabledCompanyDtoReceivable enableOrDisabledCompanyDtoReceivable= new EnableOrDisabledCompanyDtoReceivable();
			 
			if(company.isPresent()) {
				CommonResponse response = checkUnclosedContractsOfCompany(company.get());
				if(response.getStatusCode()==200) {
					if((long)response.getResponse() ==0) {
						company.get().setStatus(Status.IN_ACTIVE);
						Company companyUpdated = companyRepo.save(company.get());
						CommonResponse userListResponse = companyUserService.getCompanyUsers();
						
						if(userListResponse.getStatusCode()==200) {
							
							
							List<CompanyUserDtoReceivable> users= ((List<CompanyUserDtoReceivable>) userListResponse.getResponse()).stream().filter(user -> user.getCompanyId()==companyUpdated.getCompanyId()).collect(Collectors.toList());
							//List<CompanyUserDtoReceivable> users= (List<CompanyUserDtoReceivable>) userListResponse.getResponse();
							List<CompanyUserDtoReceivable> disabledUsers= new ArrayList<CompanyUserDtoReceivable>();
							for (CompanyUserDtoReceivable companyUserDtoReceivable : users) {
								
								CommonResponse userResponse = companyUserService.disableUser(companyUserDtoReceivable.getUserId());
								if(userResponse.getStatusCode()==201)
									disabledUsers.add((CompanyUserDtoReceivable) userResponse.getResponse());
								else
									return userResponse;
								
							}
							enableOrDisabledCompanyDtoReceivable.setUsers(disabledUsers);
							enableOrDisabledCompanyDtoReceivable.setCompany(companyUpdated);
							
						}
						else if(userListResponse.getStatusCode()==500)
							return userListResponse;
						enableOrDisabledCompanyDtoReceivable.setCompany(companyUpdated);
						return new CommonResponse<EnableOrDisabledCompanyDtoReceivable>(enableOrDisabledCompanyDtoReceivable, 200);   //returns updated Company
					}
					else
					     
					
					return new CommonResponse<Long>((long)response.getResponse(), 405);
					//returns count of unpaid invoices
				}
				else if(response.getStatusCode()==500)
					return response;
			}
			return new CommonResponse<String>("No Such Company Present", 404);
			
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}
	
	public CommonResponse checkUnclosedContractsOfCompany(Company comp) {
		try {
			List<ContractStatusdto> contracts =new ArrayList<ContractStatusdto>();
			
			CommonResponse response = contractService.findByClientApproved(comp.getCompanyId());
			if(response.getStatusCode()==200) {
				contracts.addAll((List<ContractStatusdto>) response.getResponse());
			}
			else if(response.getStatusCode()==500){
				return response;
			}
			
			CommonResponse response2 = contractService.findByVendorApproved(comp.getCompanyId());
			if(response2.getStatusCode()==200) {
				contracts.addAll((List<ContractStatusdto>) response2.getResponse());
			}
			else if(response2.getStatusCode()==500){
				return response2;
			}
			
			if(contracts.isEmpty() || contracts==null) {
				return new CommonResponse<Long>((long)0, 200);
			}
			else {
				long count=0, openInvoices;
				for (ContractStatusdto contract : contracts) {
					
					CommonResponse invoiceCountResponse= invoiceService.checkInvoicesToCloseContract(contract.getContractId());
					
					if(response.getStatusCode()==200) {
						openInvoices= (long) invoiceCountResponse.getResponse();
						
						if(openInvoices==0) {
							CommonResponse closeContractResponse = contractService.closeContract(contract.getContractId());
							if(closeContractResponse.getStatusCode()==500)
								return closeContractResponse;
						}
						
						count+= openInvoices;
					}
					else if(invoiceCountResponse.getStatusCode()==500){
						return invoiceCountResponse;
					}
				}
				
				return new CommonResponse<Long>(count, 200);
			}
			
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}

}
