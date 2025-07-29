package com.ecom.service;


import com.ecom.entity.Product;

import java.util.List;

public interface ProductService {
    Product saveProduct(Product product);
    List<Product> getAllProducts();
    Product getProductById(String id);
    Product updateProduct(String id, Product updatedProduct);
    void deleteProduct(String id);

    List<Product> getProductsByDiscount(Double discountPercent);
    List<Product> getProductsByCategoryName(String categoryName);
    List<Product> getNewArrivalProducts(Long fromEpoch);
    List<Product> getTodayHotProducts();
    List<Product> getProductsByDiscountRange(double min, double max);

}
