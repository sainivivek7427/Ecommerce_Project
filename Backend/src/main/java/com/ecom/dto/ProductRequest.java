package com.ecom.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

public class ProductRequest {
    private String name;
    private String description;
    private Double price;
    private Double discountPercent;
    private String brand;
    private Integer stockQuantity;
    private String  categoryname;

    public ProductRequest(String name, String description, Double price, Double discountPercent, String brand, Integer stockQuantity, String categoryname) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.discountPercent = discountPercent;
        this.brand = brand;
        this.stockQuantity = stockQuantity;
        this.categoryname = categoryname;
    }

    public ProductRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(Double discountPercent) {
        this.discountPercent = discountPercent;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getCategoryname() {
        return categoryname;
    }

    public void setCategoryname(String categoryname) {
        this.categoryname = categoryname;
    }

    @Override
    public String toString() {
        return "ProductRequest{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", discountPercent=" + discountPercent +
                ", brand='" + brand + '\'' +
                ", stockQuantity=" + stockQuantity +
                ", categoryname='" + categoryname + '\'' +
                '}';
    }
}
