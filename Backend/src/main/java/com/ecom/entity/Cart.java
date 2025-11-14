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

    @Column(name = "status") // ACTIVE, COMPLETED
    private String status;

    @Column(name = "created_date")
    private Long createdDate;

    // Helper method to check if this is a guest cart
    public boolean isGuestCart() {
        return userId != null && userId.startsWith("guest_");
    }

    // Helper method to check if this is a user cart
    public boolean isUserCart() {
        return userId != null && !userId.startsWith("guest_");
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
