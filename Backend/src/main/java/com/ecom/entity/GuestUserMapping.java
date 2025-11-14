package com.ecom.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "guest_user_mappings")
public class GuestUserMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "guest_id", unique = true, nullable = false)
    private String guestId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "merged_at")
    private Long mergedAt ;

    @Column(name = "device_info", columnDefinition = "TEXT")
    private String deviceInfo;

//    public GuestUserMapping(String id, String guestId, String userId, Long mergedAt, String deviceInfo) {
//        this.id = id;
//        this.guestId = guestId;
//        this.userId = userId;
//        this.mergedAt = mergedAt;
//        this.deviceInfo = deviceInfo;
//    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGuestId() {
        return guestId;
    }

    public void setGuestId(String guestId) {
        this.guestId = guestId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getMergedAt() {
        return mergedAt;
    }

    public void setMergedAt(Long mergedAt) {
        this.mergedAt = mergedAt;
    }

    public String getDeviceInfo() {
        return deviceInfo;
    }

    public void setDeviceInfo(String deviceInfo) {
        this.deviceInfo = deviceInfo;
    }

    @Override
    public String toString() {
        return "GuestUserMapping{" +
                "id=" + id +
                ", guestId='" + guestId + '\'' +
                ", userId='" + userId + '\'' +
                ", mergedAt=" + mergedAt +
                ", deviceInfo='" + deviceInfo + '\'' +
                '}';
    }
}
