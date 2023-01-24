package com.bill.billingapp.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bill.billingapp.entity.Roles;

@Repository
public interface RolesRepo extends CrudRepository<Roles, Long>{

	Roles findByRoleName(String string);
	
	List<Roles> findByCompanyType(String string);

}
