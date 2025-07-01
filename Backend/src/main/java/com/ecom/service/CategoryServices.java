package com.ecom.service;


import com.ecom.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;


public interface CategoryServices {
    Category createCategory(Category category);
    List<Category> getAllCategories();
    Category getCategoryById(String id);
    Category updateCategory(String id, String name);
    String deleteCategory(String id);
}

