package com.ecom.entity;

public class CartItemRequestDTO {
    private String productId;
    private Integer quantity;

    // Getters and Setters


    public String getProductId() {
        return productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
