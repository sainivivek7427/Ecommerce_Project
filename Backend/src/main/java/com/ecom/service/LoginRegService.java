package com.ecom.service;

import com.ecom.entity.Customer;
import org.springframework.stereotype.Service;



@Service
public interface LoginRegService {

    public Customer registerCustomer(Customer customer);

}
