package com.ecom.repository;

import java.util.Optional;

import com.ecom.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,String>{
    Optional<Customer> findByUsername(String username);
}
