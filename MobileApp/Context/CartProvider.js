import React, { createContext, useState, useContext } from 'react';

// Create Cart Context
const CartContext = createContext();

// Cart Provider component to wrap your app
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add product to cart
    const addToCart = ( product, quantity) => {
        setCart((prevCart) => {
            // const existingProduct = prevCart.find(item => item.productId === product.productId);
            // if (existingProduct) {
            //     return prevCart.map(item =>
            //         item.productId === product.productId
            //             ? { ...item, quantity: item.quantity + 1 }
            //             : item
            //     );
            // } else {
            //     return [...prevCart, { ...product, quantity: 1 }];
            // }

            const price = 99; // Replace with product.price if available
            const existing = prevCart.find(item => item.id === product.id);
            if (quantity === 0) {
                // Remove from cart if quantity is 0
                return prevCart.filter(item => item.id !== product.id);
            } else if (existing) {
                // Update quantity and amount
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity, amount: price * quantity }
                        : item
                );
            } else {
                // Add new item
                return [
                    ...prevCart,
                    {
                        id: product.id,
                        name: product.name,
                        price: price,
                        quantity: quantity,
                        amount: price * quantity,
                    },
                ];
            }
            // console.log(cart[0]);
            // console.log("Hello cart "+cart)
        });

    };

    // Remove product from cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.productId !== productId));
    };

    // Get cart item count
    const getCartItemCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use Cart Context
export const useCart = () => {
    return useContext(CartContext);
};
