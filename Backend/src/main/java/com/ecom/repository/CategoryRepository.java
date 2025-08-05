package com.ecom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecom.entity.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {


     //Category findByName(String name);
     Optional<Category> findByName(String name);

}
