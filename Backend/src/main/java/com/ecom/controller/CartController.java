package com.ecom.controller;

import com.ecom.entity.Cart;
import com.ecom.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity<Cart> createCart(@RequestBody String userId) {
        Cart cart = cartService.createCart(userId.replace("\"", "")); // safely remove quotes
        return ResponseEntity.ok(cart);
    }
}