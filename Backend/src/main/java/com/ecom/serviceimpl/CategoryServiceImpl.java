package com.ecom.serviceimpl;

import com.ecom.entity.Category;
import com.ecom.repository.CategoryRepository;
import com.ecom.repository.ProductRepository;
import com.ecom.service.CategoryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class CategoryServiceImpl  implements CategoryServices {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Category createCategory(String categoryname, MultipartFile categoryimage) {
        try {
            Category category=new Category();
            String id = UUID.randomUUID().toString();
            category.setId(id);
            category.setName(categoryname);
            category.setImageName(categoryimage.getOriginalFilename());
            category.setImage(categoryimage.getBytes());
            category.setCreatedDate(System.currentTimeMillis());
            category.setUpdatedDate(System.currentTimeMillis());
            return categoryRepository.save(category);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


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
    public Category updateCategory(String cid, String categoryname,MultipartFile categoryimage) {
        try{
            Category category = getCategoryById(cid);
            category.setId(cid);
            category.setName(categoryname);
            category.setImage(categoryimage.getBytes());
            category.setImageName(categoryimage.getOriginalFilename());
            category.setUpdatedDate(System.currentTimeMillis());
            category.setCreatedDate(category.getCreatedDate());
            return categoryRepository.save(category);
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }

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









