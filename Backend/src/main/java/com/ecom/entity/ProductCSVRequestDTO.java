package com.ecom.entity;

public class ProductCSVRequestDTO {

        private String name;
        private Double price;
        private Double discountPercent;
        private Double discountPrice;
        private String description;
        private String brand;
        private Integer stockQuantity;
        private String imageUrl;
        private Boolean isActive;
        private String categoryName;  // from CSV
        private Long createdDate;
        private Long updatedDate;

        // Getters and Setters


    public String getName() {
        return name;
    }

    public Long getUpdatedDate() {
        return updatedDate;
    }

    public Long getCreatedDate() {
        return createdDate;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public Boolean getActive() {
        return isActive;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public String getBrand() {
        return brand;
    }

    public String getDescription() {
        return description;
    }

    public Double getDiscountPercent() {
        return discountPercent;
    }

    public Double getDiscountPrice() {
        return discountPrice;
    }

    public Double getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUpdatedDate(Long updatedDate) {
        this.updatedDate = updatedDate;
    }

    public void setCreatedDate(Long createdDate) {
        this.createdDate = createdDate;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDiscountPrice(Double discountPrice) {
        this.discountPrice = discountPrice;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setDiscountPercent(Double discountPercent) {
        this.discountPercent = discountPercent;
    }
}

