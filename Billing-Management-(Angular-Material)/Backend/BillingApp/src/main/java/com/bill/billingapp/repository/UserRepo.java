package com.bill.billingapp.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.bill.billingapp.entity.Roles;
import com.bill.billingapp.entity.User;

public interface UserRepo extends CrudRepository<User, Long>{
	
	public User findByUserName(String username);
	public List<User> findByRoles(Roles roles);
}
