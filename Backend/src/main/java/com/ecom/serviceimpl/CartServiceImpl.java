package com.ecom.serviceimpl;


import com.ecom.entity.Cart;
import com.ecom.repository.CartRepository;
import com.ecom.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart createCart(String userId) {
        Cart cart = new Cart();
        cart.setId(UUID.randomUUID().toString());
        cart.setUserId(userId);
        cart.setCreatedDate(System.currentTimeMillis());
        return cartRepository.save(cart);
    }
}