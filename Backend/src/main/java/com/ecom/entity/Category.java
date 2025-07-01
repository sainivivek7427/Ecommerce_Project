package com.ecom.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @Column(name = "id", nullable = false)
    private String id;  // UUID as String

    @Column(name = "name")
    private String name;

    @Column(name = "created_date")
    private long createdDate; // epoch time

    // Constructors
    public Category() {}

    public Category(String id, String name, long createdDate) {
        this.id = id;
        this.name = name;
        this.createdDate = createdDate;
    }

    // Getters & Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(long createdDate) {
        this.createdDate = createdDate;
    }
}
