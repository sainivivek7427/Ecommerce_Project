package com.ecom.controller;

import com.ecom.entity.CartItem;
import com.ecom.entity.CartItemRequestDTO;
import com.ecom.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart-items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @PostMapping
    public ResponseEntity<String> addCartItem(@RequestParam("user_id") String userId,
                                              @RequestBody CartItemRequestDTO request) {
        cartItemService.addCartItem(userId, request);
        return ResponseEntity.ok("Item added to cart.");
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItem(
            @PathVariable String cartItemId,
            @RequestBody Map<String, Integer> payload) {
        int quantity = payload.get("quantity");
        CartItem updatedItem = cartItemService.updateCartItem(cartItemId, quantity);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<String> deleteCartItem(@PathVariable String cartItemId) {
        cartItemService.removeCartItem(cartItemId);
        return ResponseEntity.ok("Cart item removed successfully");
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCartItemsByUserId(@RequestParam("user_id") String userId) {
        List<CartItem> cartItems = cartItemService.getCartItemsByUserId(userId);
        return ResponseEntity.ok(cartItems);
    }


}
