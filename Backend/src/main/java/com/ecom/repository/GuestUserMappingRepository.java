package com.ecom.repository;

import com.ecom.entity.GuestUserMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GuestUserMappingRepository extends JpaRepository<GuestUserMapping,String> {
    //get Guest User detail by using GuestId
    Optional<GuestUserMapping> findByGuestId(String guestId);
    //Get List of guest user detail by using userId
    List<GuestUserMapping> findByUserId(String userId);

    //Get Exists or not userid in guestUserMapping table and return type boolean
    boolean existsByGuestId(String guestId);
}
