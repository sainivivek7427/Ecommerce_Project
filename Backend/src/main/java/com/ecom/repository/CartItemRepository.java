package com.ecom.repository;

import com.ecom.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, String> {

    //Get all item using cartid
    List<CartItem> findByCartId(String cartId);

    //find specific item in cart
    Optional<CartItem> findByCartIdAndProductId(String cartId,String productId);

    //Get all item by using userid
    List<CartItem> findByUserId(String userId);

    //delete all cartitems by using cartid
    void deleteByCartId(String cartId);
}
