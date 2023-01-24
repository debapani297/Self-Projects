package com.bill.billingapp.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bill.billingapp.entity.Company;
import com.bill.billingapp.entity.Contract;
import com.bill.billingapp.entity.Invoice;

@Repository
public interface InvoiceRepo extends CrudRepository<Invoice, Long>{

	List<Invoice> findAllByCompanyClient(Company company);

	List<Invoice> findAllByCompanyVendor(Company company);

	List<Invoice> findAllByContract(Contract contract);

}
