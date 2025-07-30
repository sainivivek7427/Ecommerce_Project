package com.ecom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ecom.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,String>{
    Optional<Customer> findByUsername(String username);

    @Query(value="SELECT * FROM customer WHERE customer.username = :userName AND customer.phoneno = :mobileNumber",nativeQuery=true)
    Customer findByUsernameAndMobileNo(@Param("userName") String userName,@Param("mobileNumber") String mobileNumber);
}
