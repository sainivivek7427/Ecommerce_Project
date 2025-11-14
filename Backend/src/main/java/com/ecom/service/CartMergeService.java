package com.ecom.service;

import com.ecom.entity.Cart;
import com.ecom.entity.CartItem;
import com.ecom.entity.GuestUserMapping;
import com.ecom.repository.CartItemRepository;
import com.ecom.repository.CartRepository;
import com.ecom.repository.GuestUserMappingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CartMergeService {


    private  CartRepository cartRepository;
    private  CartItemRepository cartItemRepository;
    private GuestUserMappingRepository guestUserMappingRepository;

    @Autowired
    public CartMergeService(CartRepository cartRepository,CartItemRepository cartItemRepository,GuestUserMappingRepository guestUserMappingRepository){
        this.cartRepository=cartRepository;
        this.cartItemRepository=cartItemRepository;
        this.guestUserMappingRepository=guestUserMappingRepository;
    }

    @Transactional
    public MergeResult mergeGuestCartToUser(String guestId, String userId) {
        // log.info("=== Starting cart merge: {} → {} ===", guestId, userId);
        System.out.println("=== Starting cart merge: " + guestId + " → " + userId + " ===");

        try {
            // STEP 1: Check if already merged
            if (isAlreadyMerged(guestId, userId)) {
                // log.info("✅ Guest {} already merged. Skipping.", guestId);
                System.out.println("✅ Guest " + guestId + " already merged. Skipping.");
                return MergeResult.alreadyMerged(guestId);
            }

            // STEP 2: Get guest cart by using guestid
            Cart guestCart = cartRepository.findByUserIdAndStatus(guestId, "ACTIVE")
                    .orElse(null);
            // follow step 2 check if guest cart null then not exixt create this guestMapping rows
            // guestCart not null then skip this
            if (guestCart == null) {
                // log.info("❌ No active guest cart found for {}", guestId);
                System.out.println("❌ No active guest cart found for " + guestId);
                //create guest mapping object
                createMapping(guestId, userId);
                return MergeResult.noGuestCart();
            }

            // STEP 3: Get guest cart items
            List<CartItem> guestItems = cartItemRepository.findByCartId(guestCart.getId());

            if (guestItems.isEmpty()) {
                // log.info("❌ Guest cart is empty");
                System.out.println("❌ Guest cart is empty");
                deleteGuestCart(guestCart);
                createMapping(guestId, userId);
                return MergeResult.emptyCart();
            }

            // log.info("📦 Found {} items in guest cart", guestItems.size());
            System.out.println("📦 Found " + guestItems.size() + " items in guest cart");

            // STEP 4: Get or create user cart
            Cart userCart = getOrCreateUserCart(userId);

            // STEP 5: Merge items
            int mergedCount = mergeItems(guestItems, userCart, userId);

            // STEP 6: Delete guest cart and items
            deleteGuestCart(guestCart);

            // STEP 7: Create mapping
            createMapping(guestId, userId);

            // log.info("=== ✅ Merge completed! {} items merged ===", mergedCount);
            System.out.println("=== ✅ Merge completed! " + mergedCount + " items merged ===");
            return MergeResult.success(mergedCount);

        } catch (Exception e) {
            // log.error("❌ Error during merge", e);
            System.out.println("❌ Error during merge: " + e.getMessage());
            throw new RuntimeException("Failed to merge cart: " + e.getMessage(), e);
        }
    }


    /**
     * Check if guest was already merged
     */
    private boolean isAlreadyMerged(String guestId, String userId) {
        return guestUserMappingRepository.findByGuestId(guestId)
                .map(mapping -> {
                    if (mapping.getUserId().equals(userId)) {
//                        log.info("Found existing mapping at {}", mapping.getMergedAt());
                        System.out.println("Found existing mapping at "+ mapping.getMergedAt());
                        return true;
                    }
//                    log.warn("⚠️ Guest ID mapped to different user!");
                    System.out.println("⚠️ Guest ID mapped to different user!");
                    return false;
                })
                .orElse(false);
    }

    /**
     * Get existing user cart or create new one
     */
    private Cart getOrCreateUserCart(String userId) {
        return cartRepository.findByUserIdAndStatus(userId, "ACTIVE")
                .orElseGet(() -> {
//                    log.info("Creating new cart for user {}", userId);
                    System.out.println("Creating new cart for user "+ userId);
                    Cart newCart = new Cart();
                    newCart.setId(UUID.randomUUID().toString());
                    newCart.setUserId(userId);
                    newCart.setStatus("ACTIVE");
                    newCart.setCreatedDate(System.currentTimeMillis());
                    return cartRepository.save(newCart);
                });
    }

    /**
     * Merge items from guest cart to user cart
     */
    private int mergeItems(List<CartItem> guestItems, Cart userCart, String userId) {
        int mergedCount = 0;

        for (CartItem guestItem : guestItems) {
//            log.info("  Processing: Product {} (qty: {})",
//                    guestItem.getProductId(), guestItem.getQuantity());
            System.out.println("  Processing: Product "+guestItem.getProductId()+ "(qty: "+ guestItem.getQuantity()+")");

            // Check if user already has this product
            CartItem existingItem = cartItemRepository.findByCartIdAndProductId(userCart.getId(), guestItem.getProductId())
                    .orElse(null);

            if (existingItem != null) {
                // UPDATE: Add quantities together
                int oldQty = existingItem.getQuantity();
                int newQty = oldQty + guestItem.getQuantity();
                existingItem.setQuantity(newQty);
                cartItemRepository.save(existingItem);

                System.out.println("    ✅ UPDATED: qty "+oldQty+" → "+ newQty);
//                log.info("    ✅ UPDATED: qty {} → {}", oldQty, newQty);
            } else {
                // ADD: Create new item in user cart
                CartItem newItem = new CartItem();
                newItem.setId(UUID.randomUUID().toString());
                newItem.setCartId(userCart.getId());
                newItem.setProductId(guestItem.getProductId());
                newItem.setQuantity(guestItem.getQuantity());
                newItem.setUserId(userId);
                newItem.setCreatedDate(System.currentTimeMillis());
                cartItemRepository.save(newItem);
                System.out.println("    ✅ ADDED: new item");
//                log.info("    ✅ ADDED: new item");
            }

            mergedCount++;
        }

        return mergedCount;
    }

    /**
     * Delete guest cart and all its items
     */
    private void deleteGuestCart(Cart guestCart) {
        cartItemRepository.deleteByCartId(guestCart.getId());
        cartRepository.delete(guestCart);
        System.out.println("🗑️ Deleted guest cart and items");
//        log.info("🗑️ Deleted guest cart and items");
    }

    /**
     * Create mapping to remember this merge
     */
    private void createMapping(String guestId, String userId) {
        GuestUserMapping guestUserMapping = new GuestUserMapping();
        guestUserMapping.setId(UUID.randomUUID().toString());
        guestUserMapping.setGuestId(guestId);
        guestUserMapping.setUserId(userId);
        guestUserMapping.setMergedAt(System.currentTimeMillis());
        guestUserMappingRepository.save(guestUserMapping);
        System.out.println("💾 Created mapping:"+guestId+" → "+ userId);
//        log.info("💾 Created mapping: {} → {}", guestId, userId);
    }


    public static class MergeResult {
        private final boolean merged;
        private final int itemCount;
        private final String message;
        private final boolean alreadyMerged;

        public MergeResult(boolean merged, int itemCount, String message, boolean alreadyMerged) {
            this.merged = merged;
            this.itemCount = itemCount;
            this.message = message;
            this.alreadyMerged = alreadyMerged;
        }

        //already merged guest with user
        public static MergeResult alreadyMerged(String guestId) {
            return new MergeResult(false, 0, "Already merged: " + guestId, true);
        }

        //no guest cart so skip merge step
        public static MergeResult noGuestCart() {
            return new MergeResult(false, 0, "No guest cart found", false);
        }

        //empty cart by using guestid skip this  merge part
        public static MergeResult emptyCart() {
            return new MergeResult(false, 0, "Guest cart was empty", false);
        }

        //success merge guest with user
        public static MergeResult success(int count) {
            return new MergeResult(true, count, "Merged " + count + " items", false);
        }

        // Getters
        public boolean isMerged() { return merged; }
        public int getItemCount() { return itemCount; }
        public String getMessage() { return message; }
        public boolean isAlreadyMerged() { return alreadyMerged; }
    }
}





