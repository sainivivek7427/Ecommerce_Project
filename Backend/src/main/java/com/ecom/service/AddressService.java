package com.ecom.service;

import com.ecom.entity.Address;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AddressService {
    public Address saveAddress(Address address,String userId);

    public List<Address> getAddressByUserId(String userId);

    public Address updateAddress(Address address, String id);

    public String deleteAddressbyId(String id);
}
