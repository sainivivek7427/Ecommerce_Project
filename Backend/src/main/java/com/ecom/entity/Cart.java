// ✅ Cart.java
package com.ecom.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @Column(name = "id", columnDefinition = "VARCHAR(36)")
    private String id;

    @Column(name = "user_id")
    private String userId; // ✅ Plain string, not object

    @Column(name = "created_date")
    private Long createdDate;

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Long createdDate) {
        this.createdDate = createdDate;
    }
}
