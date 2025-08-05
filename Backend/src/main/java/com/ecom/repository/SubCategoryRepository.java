package com.ecom.repository;

import com.ecom.entity.Category;
import com.ecom.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubCategoryRepository  extends JpaRepository<SubCategory,String> {
    Optional<SubCategory> findByScategory(String scategory);
    List<SubCategory> findByCategoryid(String categoryid);


}
