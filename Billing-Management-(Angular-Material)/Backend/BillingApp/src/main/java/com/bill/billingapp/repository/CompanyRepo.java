package com.bill.billingapp.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bill.billingapp.entity.Company;
import com.bill.billingapp.entity.Status;

@Repository
public interface CompanyRepo extends CrudRepository<Company, Long>{

	List<Company> findByCompanyType(String string);

	List<Company> findByStatus(Status status);

}
