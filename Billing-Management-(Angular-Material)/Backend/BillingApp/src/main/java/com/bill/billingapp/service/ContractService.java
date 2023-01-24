package com.bill.billingapp.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bill.billingapp.dto.ContractDto;
import com.bill.billingapp.dto.ContractStatusdto;
import com.bill.billingapp.entity.Company;
import com.bill.billingapp.entity.CompanyUser;
import com.bill.billingapp.entity.Contract;
import com.bill.billingapp.entity.Roles;
import com.bill.billingapp.entity.Status;
import com.bill.billingapp.entity.User;
import com.bill.billingapp.repository.CompanyRepo;
import com.bill.billingapp.repository.CompanyUserRepo;
import com.bill.billingapp.repository.ContractRepo;
import com.bill.billingapp.utilities.CommonResponse;
import com.bill.billingapp.utilities.ContractSender;

@Service
public class ContractService {

	@Autowired
	private CompanyRepo companyRepo;
	@Autowired
	private CompanyUserRepo companyUserRepo;
	
	@Autowired
	private ContractRepo contractRepo;
	
	public CommonResponse findByVendorPending(Long cid){
		try {
			List<ContractStatusdto> pendcontracts=new ArrayList<ContractStatusdto>();
			Optional<Company> company= companyRepo.findById(cid);
			
			if(company.isPresent()) {
				List<Contract> contracts=contractRepo.findByCompanyVendor(company.get());
				
				List<Contract> pendingContracts= contracts.stream().filter(contract -> contract.getStatus().equals(Status.PENDING)).collect(Collectors.toList());
				
				
				if(!pendingContracts.isEmpty() && pendingContracts!=null) {
					for(Contract s:pendingContracts) {
						ContractStatusdto c=new ContractStatusdto();
						c.setContractId(s.getContractId());
						c.setCompanyVendor(s.getCompanyVendor().getCompanyName());
						c.setCompanyClient(s.getCompanyClient().getCompanyName());
						c.setContractRaisedBy(s.getContractRaisedby().getUserName());
						c.setAmount(s.getAmount());
						c.setStatus(s.getStatus().toString());
						c.setToDate(s.getToDate());
						c.setFromDate(s.getFromDate());
						c.setBalance(s.getBalance());
						pendcontracts.add(c);
						
					}
					System.out.println(pendcontracts);
					return new CommonResponse<List<ContractStatusdto>>(pendcontracts, 200);
				}
				return new CommonResponse<String>("No pending contracts Present", 404);
				
			}
			
			return new CommonResponse<String>("Company not Present", 404);
			 
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
		
	}
	
	public CommonResponse findByClientPending(Long cid){
		try {
			List<ContractStatusdto> pendcontracts=new ArrayList<ContractStatusdto>();
			Optional<Company> company= companyRepo.findById(cid);
			
			if(company.isPresent()) {
				List<Contract> contracts=contractRepo.findByCompanyClient(company.get());
				
				List<Contract> pendingContracts= contracts.stream().filter(contract -> contract.getStatus().equals(Status.PENDING)).collect(Collectors.toList());
				
				
				if(!pendingContracts.isEmpty() && pendingContracts!=null) {
					for(Contract s:pendingContracts) {
						ContractStatusdto c=new ContractStatusdto();
						c.setContractId(s.getContractId());
						c.setCompanyVendor(s.getCompanyVendor().getCompanyName());
						c.setCompanyClient(s.getCompanyClient().getCompanyName());
						c.setContractRaisedBy(s.getContractRaisedby().getUserName());
						c.setAmount(s.getAmount());
						c.setStatus(s.getStatus().toString());
						c.setToDate(s.getToDate());
						c.setFromDate(s.getFromDate());
						c.setBalance(s.getBalance());
						pendcontracts.add(c);
						
					}
					
					return new CommonResponse<List<ContractStatusdto>>(pendcontracts, 200);
				}
				return new CommonResponse<String>("No pending contracts Present", 404);
				
			}
			
			return new CommonResponse<String>("Company not Present", 404);
			 
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
	}
	
	//public CommonResponse findByVendorApproved(Long cid){}
	public CommonResponse findByVendorApproved(Long cid){
		try {
			List<ContractStatusdto> apprcontracts=new ArrayList<ContractStatusdto>();
			Optional<Company> company= companyRepo.findById(cid);
			
			if(company.isPresent()) {
				List<Contract> contracts=contractRepo.findByCompanyVendor(company.get());
				
				List<Contract> pendingContracts= contracts.stream().filter(contract -> contract.getStatus().equals(Status.APPROVED)).collect(Collectors.toList());
				
				
				if(!pendingContracts.isEmpty() && pendingContracts!=null) {
					for(Contract s:pendingContracts) {
						ContractStatusdto c=new ContractStatusdto();
						c.setContractId(s.getContractId());
						c.setCompanyVendor(s.getCompanyVendor().getCompanyName());
						c.setCompanyClient(s.getCompanyClient().getCompanyName());
						c.setContractRaisedBy(s.getContractRaisedby().getUserName());
						c.setAmount(s.getAmount());
						c.setStatus(s.getStatus().toString());
						c.setToDate(s.getToDate());
						c.setFromDate(s.getFromDate());
						c.setBalance(s.getBalance());
						apprcontracts.add(c);
						
					}
					return new CommonResponse<List<ContractStatusdto>>(apprcontracts, 200);
				}
				return new CommonResponse<String>("No approved contracts Present", 404);
				
			}
			
			return new CommonResponse<String>("Company not Present", 404);
			 
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
	}
	
	
//	public CommonResponse findByClientApproved(Long cid){}
	public CommonResponse findByClientApproved(Long cid){
		try {
			List<ContractStatusdto> apprcontracts=new ArrayList<ContractStatusdto>();
			Optional<Company> company= companyRepo.findById(cid);
			
			if(company.isPresent()) {
				List<Contract> contracts=contractRepo.findByCompanyClient(company.get());
				
				List<Contract> pendingContracts= contracts.stream().filter(contract -> contract.getStatus().equals(Status.APPROVED)).collect(Collectors.toList());
				
				
				if(!pendingContracts.isEmpty() && pendingContracts!=null) {
					for(Contract s:pendingContracts) {
						ContractStatusdto c=new ContractStatusdto();
						c.setContractId(s.getContractId());
						c.setCompanyVendor(s.getCompanyVendor().getCompanyName());
						c.setCompanyClient(s.getCompanyClient().getCompanyName());
						c.setContractRaisedBy(s.getContractRaisedby().getUserName());
						c.setAmount(s.getAmount());
						c.setStatus(s.getStatus().toString());
						c.setToDate(s.getToDate());
						c.setFromDate(s.getFromDate());
						c.setBalance(s.getBalance());
						apprcontracts.add(c);
						
					}
					return new CommonResponse<List<ContractStatusdto>>(apprcontracts, 200);
				}
				return new CommonResponse<String>("No approved contracts Present", 404);
				
			}
			
			return new CommonResponse<String>("Company not Present", 404);
			 
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
	}
	
	public CommonResponse approveContract(Long contractId, Long userId){
		try {
			Optional<Contract> contract= contractRepo.findById(contractId);
			
			if(contract.isPresent()) {
				
				contract.get().setStatus(Status.APPROVED);
				Optional<CompanyUser> companyUser= companyUserRepo.findById(userId);
				
				if(companyUser.isPresent()) {
					contract.get().setContractApprovedBy(companyUser.get());
					Contract updatedContract= contractRepo.save(contract.get());
					return new CommonResponse<Contract>(updatedContract, 200);
				}
				return new CommonResponse<String>("User Not Present", 404);
				
			}
			
			return new CommonResponse<String>("Contract not Present", 404);
			 
		}catch(Exception ex) {
			return new CommonResponse<String> (ex.getMessage(), 500);
		}
	}
//	public CommonResponse findByVendorApproved(Long cid){}
//	public CommonResponse findByClientApproved(Long cid){}
//	public CommonResponse findByClientPending(Long cid){}
	
	
	
	public CommonResponse createContract(ContractDto contractDto) {
		try {
			Contract contract=new Contract();
			CompanyUser approver=new CompanyUser();
			Company companyClient=companyRepo.findById(Long.parseLong(contractDto.getCompanyClientId())).get();
			Company companyVendor=companyRepo.findById(Long.parseLong(contractDto.getCompanyVendorId())).get();
			if(contractDto.getContractApprovedById()!=null && !contractDto.getContractApprovedById().equalsIgnoreCase("")) {
				approver=companyUserRepo.findById(Long.parseLong (contractDto.getContractApprovedById())).get();
			}
			CompanyUser raisedBy=companyUserRepo.findById(Long.parseLong (contractDto.getContractRaisedById())).get();
			
			contract.setAmount(contractDto.getAmount());
			contract.setCompanyClient(companyClient);
			contract.setCompanyVendor(companyVendor);
			//contract.setContractApprovedBy(approver);
			contract.setContractRaisedby(raisedBy);
			contract.setFromDate(contractDto.getFromDate());
			contract.setStatus(Status.valueOf(contractDto.getStatus().toUpperCase()));
			contract.setToDate(contractDto.getToDate());
			contract.setBalance(contractDto.getAmount());
			contractRepo.save(contract);
			
			return new CommonResponse<Contract>(contract, 201);
		} catch (Exception e) {
			return new CommonResponse<String>(e.getMessage(), 500);
		}
		
	}
	
	public CommonResponse closeContract(long contractId) {
		try {
		Contract contract= contractRepo.findById(contractId).get();
		//System.out.println(contract.getContractId());
		contract.setStatus(Status.CLOSED);
		contract= contractRepo.save(contract);
		return new CommonResponse<Contract>(contract, 200);
		} catch (Exception e) {
			return new CommonResponse<String>(e.getMessage(), 500);
		}
		
	}
	
	//added to get Contract details For Invoice Raising
	public CommonResponse findContractByContractId(Long contractId) {
		try {
		Contract contract= contractRepo.findById(contractId).get();
		//System.out.println(contract.getContractId());
		
		return new CommonResponse<Contract>(contract, 200);
		} catch (Exception e) {
			return new CommonResponse<String>(e.getMessage(), 500);
		}
		
	}
}



	