package com.ecom.repository;

import com.ecom.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCategoryRepository  extends JpaRepository<SubCategory,String> {
}
