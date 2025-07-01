package com.ecom.serviceimpl;

import com.ecom.entity.Category;
import com.ecom.repository.CategoryRepository;
import com.ecom.repository.ProductRepository;
import com.ecom.service.CategoryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CategoryServiceImpl  implements CategoryServices {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Category createCategory(Category category) {
        String id = UUID.randomUUID().toString();
        category.setId(id);

        //set cerated date as current epock time
        category.setCreatedDate(System.currentTimeMillis());
        return categoryRepository.save(category);

    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(String id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    @Override
    public Category updateCategory(String id, String name) {
        Category category = getCategoryById(id);
        category.setName(name);
        return categoryRepository.save(category);
         //return   "Category updated successfully";
    }

//satyamr1112@gmail.com
    @Override
    public String deleteCategory(String id) {
        boolean isUsedInProduct = productRepository.existsByCategoryId(id);
        if (isUsedInProduct) {
            throw new RuntimeException("Cannot delete: Category is associated with products");
        }

        categoryRepository.deleteById(id);
        return "✅ Category deleted successfully";
    }



}









