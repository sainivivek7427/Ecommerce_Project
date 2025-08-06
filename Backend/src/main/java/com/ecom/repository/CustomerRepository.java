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
    Optional<Customer> findByPhoneno(Long phoneno);
    @Query(value="SELECT * FROM customer WHERE customer.username = :userName AND customer.phoneno = :mobileNumber",nativeQuery=true)
    Customer findByUsernameAndMobileNo(@Param("userName") String userName,@Param("mobileNumber") String mobileNumber);
    @Query("SELECT c FROM Customer c WHERE c.username = :username AND c.password = :password")
    Customer findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    @Query(value="SELECT * FROM customer WHERE customer.phoneno = :phoneno AND customer.password = :password",nativeQuery=true)
    Customer findByMobileNoAndPassword(@Param("phoneno") Long phoneno,@Param("password") String password);
}
