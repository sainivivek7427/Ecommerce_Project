package com.ecom.service;


import com.ecom.entity.Category;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface CategoryServices {
    Category createCategory(String categoryname, MultipartFile categoryimage);
    List<Category> getAllCategories();
    Category getCategoryById(String id);
    Category updateCategory(String cid, String categoryname,MultipartFile categoryimage);
    String deleteCategory(String id);
}

