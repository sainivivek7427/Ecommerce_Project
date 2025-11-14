package com.ecom.controller;

import com.ecom.entity.Address;
import com.ecom.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    AddressService addressService;

    @PostMapping("/save/{userId}")
    public ResponseEntity<?> saveAddress(@RequestBody Address address, @PathVariable String userId){
        Address addressRes=addressService.saveAddress(address,userId);
        return new ResponseEntity<>(addressRes, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getAddressFilterByUserId(@PathVariable String userId){
        List<Address> addressList=addressService.getAddressByUserId(userId);
        return ResponseEntity.ok(addressList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAddressByAddressId(@PathVariable String id,@RequestBody Address address){
        Address updateAddressRes=addressService.updateAddress(address,id);
        return ResponseEntity.ok(updateAddressRes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddressByAddressId(@PathVariable String id){
        String deleteRes=addressService.deleteAddressbyId(id);
        return ResponseEntity.ok(deleteRes);
    }

}
