package com.bill.billingapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bill.billingapp.entity.Payment;

@Repository
public interface PaymentRepo extends CrudRepository<Payment, Long> {

}
