package com.ecom.service;

import com.ecom.entity.Cart;
import com.ecom.entity.CartItem;

public interface CartService {
    Cart createCart(String userId);


}