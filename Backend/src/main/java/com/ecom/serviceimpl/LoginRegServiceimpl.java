package com.ecom.serviceimpl;

import java.util.UUID;

import com.ecom.entity.Customer;
import com.ecom.repository.CustomerRepository;
import com.ecom.service.LoginRegService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginRegServiceimpl implements LoginRegService {
    @Autowired
    CustomerRepository customerRepository;

    @Override
    public Customer registerCustomer(Customer customer){
        customer.setCuuid(UUID.randomUUID().toString());
        customer.setCreatedDate(System.currentTimeMillis());
        customer.setUpdateDate(System.currentTimeMillis());
        if(customer.getUsername().equals("ecomm_admin")){
            customer.setRole("Admin");
        }
        else{
            customer.setRole("User");
        }
        return customerRepository.save(customer);

    }
}
