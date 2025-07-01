package com.ecom.serviceimpl;

import com.ecom.entity.Product;
import com.ecom.repository.ProductRepository;
import com.ecom.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product) {
        long now = System.currentTimeMillis(); // or Instant.now().getEpochSecond()
        product.setCreatedDate(now);
        product.setUpdatedDate(now);
        product.setId(UUID.randomUUID().toString());
        System.out.println(product);
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    @Override
    public Product updateProduct(String id, Product updatedProduct) {
        Product existing = getProductById(id);
        existing.setPrice(updatedProduct.getPrice());
        existing.setDiscountPercent(updatedProduct.getDiscountPercent());
        existing.setDiscountPrice(updatedProduct.getDiscountPrice());
        existing.setUpdatedDate(System.currentTimeMillis());
        return productRepository.save(existing);
    }

    @Override
    public void deleteProduct(String id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }


}
