package com.ecom.entity;

import jakarta.persistence.*;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "cart_items")
public class CartItem {
    @Id
    private String id;

    
    @Column(name = "cart_id")
    private String cartId;

    @Column(name = "product_id")
    private String productId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "created_date")
    private Long createdDate;

    @Column(name = "user_id")
    private String userId;
    // Getters and Setters


    public String getId() {
        return id;
    }

    

    public String getProductId() {
        return productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Long getCreatedDate() {
        return createdDate;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setCreatedDate(Long createdDate) {
        this.createdDate = createdDate;
    }
    public String getCartId() {
        return cartId;
    }   
    public void setCartId(String cartId) {
        this.cartId = cartId;   
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
