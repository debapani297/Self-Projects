package com.bill.billingapp.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bill.billingapp.entity.Company;
import com.bill.billingapp.entity.Contract;

@Repository
public interface ContractRepo extends CrudRepository<Contract, Long>{

	List<Contract> findByCompanyVendor(Company company);

	List<Contract> findByCompanyClient(Company company);

}
