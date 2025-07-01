package com.ecom.controller;

import com.ecom.dto.ProductRequest;
import com.ecom.entity.Category;
import com.ecom.entity.Product;
import com.ecom.repository.CategoryRepository;
import com.ecom.repository.ProductRepository;
import com.ecom.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.DataInput;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {


    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductService productService;


    //add Data in db bulk using the CSV file
//    @PostMapping("/upload-csv")
//    public ResponseEntity<String> uploadCSV(@RequestParam("file") MultipartFile file) {
//        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
//            List<Product> products = new ArrayList<>();
//            String line;
//            reader.readLine(); // Skip header
//
//            while ((line = reader.readLine()) != null) {
//                String[] data = line.split(",");
//
//                if (data.length < 12) continue; // ✅ Fix 1: Now correct
//
//                String categoryName = data[9].trim();
//                // ✅ Fix 2
//                System.out.println("category name "+categoryName);
//                Category category = categoryRepository.findByName(categoryName).orElseThrow(()-> new NullPointerException("Ddata not found"));
//                if (category == null) {
//                    System.out.println("Category not found: " + categoryName);
//                    continue;
//                }
//
//                Product product = new Product();
//                product.setId(UUID.randomUUID().toString());
//                product.setName(data[0].trim());
//                product.setPrice(Double.parseDouble(data[1].trim()));
//                product.setDiscountPercent(Double.parseDouble(data[2].trim()));
//                product.setDiscountPrice(Double.parseDouble(data[3].trim()));
//                product.setDescription(data[4].trim());
//                product.setBrand(data[5].trim());
//                product.setStockQuantity(Integer.parseInt(data[6].trim()));
//                product.setImageUrl(data[7].trim());
//                product.setIsActive(Boolean.parseBoolean(data[8].trim()));
//                product.setCategoryId(category.getId()); // ✅ categoryName → categoryId
//                product.setCreatedDate(Long.parseLong(data[10].trim())); // ✅ Fix 3
//                product.setUpdatedDate(Long.parseLong(data[11].trim())); // ✅ Fix 4
//
//                products.add(product);
//            }
//
//            if (products.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No valid products to upload.");
//            }
//
//            productRepository.saveAll(products);
//            return ResponseEntity.ok("CSV data uploaded successfully. Total: " + products.size());
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Upload failed: " + e.getMessage());
//        }
//    }


    @PostMapping(value = "/add")
    public ResponseEntity<String> addUser(
            @RequestPart("productdata") String productdata,
            @RequestPart("prodcutimage") MultipartFile file) {

        ProductRequest productRequest;
        try {
            ObjectMapper mapper = new ObjectMapper();
            productRequest = mapper.readValue( productdata, ProductRequest.class);
            Product product=new Product();
            product.setId(UUID.randomUUID().toString());
            product.setActive(true);
            product.setImage(file.getBytes());
            product.setBrand(productRequest.getBrand()); //pr
            product.setImageName(file.getOriginalFilename());
            product.setDescription(productRequest.getDescription()); //pr
            product.setCategoryId(categoryRepository.findByName(productRequest.getCategoryname()).get().getId());
            product.setName(productRequest.getName()); //pr
            product.setCreatedDate(System.currentTimeMillis());
            product.setDiscountPercent(productRequest.getDiscountPercent()); //pr
            product.setPrice(productRequest.getPrice()); //pr
            product.setStockQuantity(productRequest.getStockQuantity()); //pr
            product.setUpdatedDate(System.currentTimeMillis());
            product.setDiscountPrice(productRequest.getPrice()-(productRequest.getPrice()*productRequest.getDiscountPercent())/100);
            Product prodResponse=productRepository.save(product);
//            System.out.println(prodResponse);
            return ResponseEntity.ok("Product saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Get All Products
    @GetMapping("/get")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // Get Product by ID
    @GetMapping("/get/{pid}")
    public ResponseEntity<?> getProductById(@PathVariable String pid) {
        try {
            Product product = productService.getProductById(pid);
            return ResponseEntity.ok(product);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Update Product by ID (only price & discount)
//    @PutMapping("/update/{pid}")
//    public ResponseEntity<?> updateProduct(@PathVariable String pid, @RequestBody Product updatedProduct) {
//        try {
//            Product updated = productService.updateProduct(pid, updatedProduct);
//            System.out.println("Product Updated Successfully");
//            return ResponseEntity.ok(updated);
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        }
//    }

    @PutMapping("/edit/{productId}")
    public ResponseEntity<String> updateProduct(
            @PathVariable String productId,
            @RequestPart("product") String product,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {

//        System.out.println("Updating product with ID: " + productId);
//        System.out.println("New name: " + product.getName());

        if (imageFile != null && !imageFile.isEmpty()) {
            System.out.println("Received image: " + imageFile.getOriginalFilename());
            // Save image to DB or file system
        }
        Product productResposenDB=productRepository.findById(productId).orElseThrow(()-> new NullPointerException("Data not found"));
        ProductRequest productRequest;
        try {
            ObjectMapper mapper = new ObjectMapper();
            productRequest = mapper.readValue( product, ProductRequest.class);
            Product productupdate=new Product();
            productupdate.setId(productId);
            productupdate.setActive(true);
            productupdate.setImage(imageFile.getBytes());
            productupdate.setBrand(productRequest.getBrand()); //pr
            productupdate.setImageName(imageFile.getOriginalFilename());
            productupdate.setDescription(productRequest.getDescription()); //pr
            productupdate.setCategoryId(categoryRepository.findByName(productRequest.getCategoryname()).get().getId());
            productupdate.setName(productRequest.getName()); //pr
            productupdate.setCreatedDate(productResposenDB.getCreatedDate());
            productupdate.setDiscountPercent(productRequest.getDiscountPercent()); //pr
            productupdate.setPrice(productRequest.getPrice()); //pr
            productupdate.setStockQuantity(productRequest.getStockQuantity()); //pr
            productupdate.setUpdatedDate(System.currentTimeMillis());
            productupdate.setDiscountPrice(productRequest.getPrice()-(productRequest.getPrice()*productRequest.getDiscountPercent())/100);
            Product prodResponse=productRepository.save(productupdate);
            System.out.println(prodResponse);
//            return ResponseEntity.ok("Product saved successfully");

        // Update product logic here

        return ResponseEntity.ok("Product updated successfully");
    }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
        // Delete Product by ID
    @DeleteMapping("/delete/{pid}")
    public ResponseEntity<String> deleteProduct(@PathVariable String pid) {
        try {
            productService.deleteProduct(pid);
            return ResponseEntity.ok("Product deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }



}
