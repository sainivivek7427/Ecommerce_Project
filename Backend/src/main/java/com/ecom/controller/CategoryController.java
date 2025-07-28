package com.ecom.controller;

import com.ecom.entity.Category;
import com.ecom.service.CategoryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {


    private final CategoryServices categoryServices;

    @Autowired
    public CategoryController(CategoryServices categoryServices) {
        this.categoryServices = categoryServices;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@RequestParam("categoryname") String categoryname,
                                            @RequestParam("categoryimage") MultipartFile categoryimage) {
        Category response = categoryServices.createCategory(categoryname,categoryimage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getAllCategories() {
        return ResponseEntity.ok(categoryServices.getAllCategories());
    }

    @GetMapping("/get/{cid}")
    public ResponseEntity<?> getCategoryById(@PathVariable String cid) {
        return ResponseEntity.ok(categoryServices.getCategoryById(cid));
    }

    @PutMapping("/update/{cid}")
    public ResponseEntity<?> updateCategoryName(@PathVariable String cid,@RequestParam("categoryname") String categoryname,
                                                @RequestParam("categoryimage") MultipartFile categoryimage) {
        return ResponseEntity.ok(categoryServices.updateCategory(cid, categoryname,categoryimage));
    }

    @DeleteMapping("/delete/{cid}")
    public ResponseEntity<String> deleteCategory(@PathVariable String cid) {
        return ResponseEntity.ok(categoryServices.deleteCategory(cid));
    }
}