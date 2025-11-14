package com.ecom.controller;

import com.ecom.entity.CartItem;
import com.ecom.dto.CartItemRequestDTO;
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

//    public ResponseEntity<CartResponse> addToCart(@RequestBody AddToCartRequest request) {
//        Cart.OwnerType ownerType = request.getUserId() != null
//                ? Cart.OwnerType.USER
//                : Cart.OwnerType.GUEST;
//
//        String ownerId = request.getUserId() != null
//                ? request.getUserId()
//                : request.getGuestId();
//
//        Cart cart = cartService.addToCart(
//                ownerId,
//                ownerType,
//                UUID.fromString(request.getProductId()),
//                request.getQuantity(),
//                request.getPrice()
//        );
//
//        CartResponse response = new CartResponse();
//        response.setCart(cart);
//        response.setSuccess(true);
//
//        return ResponseEntity.ok(response);
//    }
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
