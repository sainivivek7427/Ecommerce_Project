package com.ecom.serviceimpl;

import com.ecom.entity.Address;
import com.ecom.repository.AddressRepo;
import com.ecom.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    AddressRepo addressRepo;

    @Override
    public Address saveAddress(Address address,String userId) {
        String createId= UUID.randomUUID().toString();
        address.setId(createId);
        address.setCreateDate(System.currentTimeMillis());
        address.setUserId(userId);
        return addressRepo.save(address);

    }

    @Override
    public List<Address> getAddressByUserId(String userId) {
        List<Address>  addressesList=addressRepo.findByUserId(userId);
        if(addressesList.isEmpty()) throw new RuntimeException("User not exist");
        return addressesList;
    }

    @Override
    public Address updateAddress(Address address, String id){
//        address.setUserId(ad);
        Address getAddress=addressRepo.findById(id).orElseThrow(()->new RuntimeException("address not found by Address id "+id));

        getAddress.setCreateDate(System.currentTimeMillis());
        getAddress.setId(id);
        getAddress.setCity(address.getCity());
        getAddress.setHouseno(address.getHouseno());
//        getAddress.setCity(address.getCity());
        getAddress.setLandmark(address.getLandmark());
        getAddress.setPincode(address.getPincode());
        getAddress.setReceiverName(address.getReceiverName());
        getAddress.setReceiverPhoneno(address.getReceiverPhoneno());
        getAddress.setUserId(getAddress.getUserId());

        return addressRepo.save(getAddress);
//        getAddress.se
    }

    @Override
    public String deleteAddressbyId(String id){
        Address getAddress=addressRepo.findById(id).orElseThrow(()->new RuntimeException("address not found by Address id "+id));
        addressRepo.delete(getAddress);
        return "Delete Address Successfully in database";
    }
}
