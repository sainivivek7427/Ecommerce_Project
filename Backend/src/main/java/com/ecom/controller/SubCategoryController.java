package com.ecom.controller;

import com.ecom.dto.SubCategoryResponse;
import com.ecom.entity.SubCategory;
import com.ecom.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SubCategoryController {

    private final SubCategoryService subCategoryService;

    @Autowired
    public SubCategoryController(SubCategoryService subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    @PostMapping("/subcategories")
    public ResponseEntity<?> createSubCategory(@RequestParam("subcategoryname") String subcategoryname,
                                               @RequestParam("subcategoryimage") MultipartFile file,
                                               @RequestParam String categoryid){
        SubCategory subCategory=subCategoryService.createSubCategory(subcategoryname,file,categoryid);
        return ResponseEntity.ok(subCategory);

    }

    @GetMapping("/subcategories")
    public ResponseEntity<?> getAllSubcategory(){
        List<SubCategory> subCategoryList=subCategoryService.getAllSubCategory();
        return  ResponseEntity.ok(subCategoryList);
    }

    @PutMapping("/subcategories/{subid}")
    public ResponseEntity<?> getSubCategoryById(@PathVariable String subid,@RequestParam("subcategoryname") String subcategoryname,
                                                @RequestParam("subcategoryimage") MultipartFile file){
        SubCategory updatesubCategory=subCategoryService.updateSubCategorybyId(subid,subcategoryname,file);
        return ResponseEntity.ok(updatesubCategory);
    }

    @DeleteMapping("/subcategories/{subid}")
    public ResponseEntity<?> deleteSubCategory(@PathVariable String subid){
        String deleteSubCategoryResponse=subCategoryService.deleteSubCategory(subid);
        return ResponseEntity.ok(deleteSubCategoryResponse);
    }

    //Get subcategory name,subcategoryid  by categoryid
    @GetMapping("/subcategories/by-category")
    public List<SubCategoryResponse> getSubcategoriesByCategory(@RequestParam String categoryId) {
        return subCategoryService.getSubcategoriesByCategory(categoryId);
    }


    //First categoryid pass in request param
    //secodn create dto classs=> subcategoryResposneDto private String subctrname,subid
    //return dtoResponseclass in this api



}
