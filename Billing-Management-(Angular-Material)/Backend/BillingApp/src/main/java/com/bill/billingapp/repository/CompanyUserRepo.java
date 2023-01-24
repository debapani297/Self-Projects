package com.bill.billingapp.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bill.billingapp.entity.CompanyUser;
import com.bill.billingapp.entity.Roles;
import com.bill.billingapp.entity.User;

@Repository
public interface CompanyUserRepo extends CrudRepository<CompanyUser, Long>{

	CompanyUser findByUserName(String userName);

	List<CompanyUser> findByRoles(Roles roles);

}