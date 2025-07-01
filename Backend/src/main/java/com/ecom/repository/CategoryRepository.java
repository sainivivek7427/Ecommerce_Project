package com.ecom.repository;

import com.ecom.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, String> {


     //Category findByName(String name);
     Optional<Category> findByName(String name);
}
