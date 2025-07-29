package com.ecom.service;

import com.ecom.entity.CartItem;
import com.ecom.dto.CartItemRequestDTO;

import java.util.List;

public interface CartItemService {
    void addCartItem(String userId, CartItemRequestDTO request);
    CartItem updateCartItem(String cartItemId, int quantity);
    void removeCartItem(String cartItemId);
    List<CartItem> getCartItemsByUserId(String userId);


}
