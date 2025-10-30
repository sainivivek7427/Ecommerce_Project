import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = useState([]);

    // Add product to wishlist
    const addToWishlist = (product) => {
        // setWishlist(prev => {
        //     const exists = prev.find(item => item.id === product.id);
        //
        //     if (exists) return prev; // already added
        //     return [...prev, product];
        // });
        setWishlist((prev) => {
            const exists = prev.some(item => item.id === product.id);

            if (exists) {
                return prev.filter(item => item.id !== product.id); // remove
            }

            return [...prev, product]; // add full product object
        });
        // setWishlist((prev) =>
        //   prev.includes(product.id)
        //     ? prev.filter(id => id !== product.id)
        //     : [...prev, product.id]
        //
        // );

        // setWishlist((prev) => {
        //     const exists = prev.find((item) => item.id === product.id);
        //     if (exists) {
        //         return prev.filter((item) => item.id !== product.id);
        //     }
        //     return [...prev, product];
        // });
    };

    // Remove product from wishlist
    const removeFromWishlist = (productId) => {
        console.log("product id remove wishlist exist "+productId);
        setWishlist(prev => prev.filter(item => item.id !== productId));
    };

    // Check item in wishlist
    const isInWishlist = (productId) => {
        console.log("product id is in wishlist exist "+productId);
        return wishlist.some(item => item.id === productId);
    };

    // Total wishlist count
    const getWishlistCount = () => {
        console.log("wishlist count "+wishlist.length);
        return wishlist.length;
    }

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                getWishlistCount
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook
export const useWishlist = () => {
    return useContext(WishlistContext);
};
