package com.ecom.dto;
public class SubCategoryResponse {
    private String id;
    private String name;

    public SubCategoryResponse(String id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getters and Setters

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}

