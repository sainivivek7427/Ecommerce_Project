package com.ecom.service;


import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.entity.Category;

@Service
public interface CategoryServices {
    Category createCategory(String categoryname, MultipartFile categoryimage);
    List<Category> getAllCategories();
    Category getCategoryById(String id);
    Category updateCategory(String cid, String categoryname,MultipartFile categoryimage);
    String deleteCategory(String id);
}

