import React, { createContext, useState, useContext } from 'react';
import guestManager from "../utils/guestManager";
// Create Cart Context
const CartContext = createContext();

// Cart Provider component to wrap your app
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // // Add product to cart
    // const addToCart = ( product, quantity,price) => {
    //     console.log("Product image "+product.images)
    //     console.log(`Adding product ${product.id} with quantity ${quantity} with addto cart provider ${product.images}` );
    //                 // console.log("Cart after adding product: ", cart);
    //     setCart((prevCart) => {
    //         const existing = prevCart.find(item => item.id === product.id);
    //         if (quantity === 0) {
    //             // Remove from cart if quantity is 0
    //             return prevCart.filter(item => item.id !== product.id);
    //         } else if (existing) {
    //             // Update quantity and amount
    //             return prevCart.map(item =>
    //                 item.id === product.id
    //                     ? { ...item, quantity, amount: price * quantity }
    //                     : item
    //             );
    //         } else {
    //             // Add new item
    //             return [
    //                 ...prevCart,
    //                 {
    //                     id: product.id,
    //                     name: product.name,
    //                     price: price,
    //                     quantity: quantity,
    //                     amount: price * quantity,
    //                     image:product.images
    //                 },
    //             ];
    //         }
    //
    //         // console.log(cart[0]);
    //         // console.log("Hello cart "+cart)
    //     });
    //
    // };
    //
    // const updateQuantity = (product, action) => {
    //     setCart(prev =>
    //         prev.map(item => {
    //             if (item.id === product.id) {
    //                 let newQty = item.quantity;
    //                 if (action === 'add') newQty++;
    //                 else if (action === 'minus' && newQty > 1) newQty--;
    //                 return { ...item, quantity: newQty, totalPrice: item.price * newQty };
    //             }
    //             return item;
    //         })
    //     );
    // };
    // // Remove product from cart
    // const removeFromCart = (productId) => {
    //     setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    // };
    const guestUserId=guestManager.getUserId() ||guestManager.getOrCreateGuestId();
    const addToCarts = async (productId, quantity) => {
        const payload = {
            productId,
            quantity,
            guestUserId,
        };

        // await addToCartApi(cartId, payload);
        // await loadCartItems();
    };
    const addToCart = (product, quantity, totalPrice) => {

        console.log("add cart "+product, quantity, totalPrice);
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                // update quantity
                return prev.map(item =>
                    item.id === product.id
                        ?
                        { ...item, quantity, totalPrice }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity, totalPrice }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    // const updateQuantity = (product, action) => {
    //     setCart(prev =>
    //         prev.map(item => {
    //             if (item.id === product.id) {
    //                 let newQty = item.quantity;
    //                 if (action === 'add') newQty++;
    //                 else if (action === 'minus' && newQty > 1) newQty--;
    //                 return { ...item, quantity: newQty, totalPrice: item.price * newQty };
    //             }
    //             return item;
    //         })
    //     );
    // };

/***************update quantity
 // setCart(prev => {
 //     const existing = prev[product.id];
 //     if (!existing) return prev;
 //
 //     let newQty = existing.quantity;
 //     if (action === 'add') newQty += 1;
 //     else if (action === 'minus' && newQty > 1) newQty -= 1;
 //     else if (action === 'minus' && newQty === 1) {
 //         const updated = { ...prev };
 //         delete updated[product.id];
 //         return updated;
 //     }
 //
 //     return {
 //         ...prev,
 //         [product.id]: { product, quantity: newQty, totalPrice: product.price * newQty }
 //     };
 // });
   */
    const updateQuantity = (product, action) => {


        setCart(prev => {
            const idx = prev.findIndex(i => i.id === product.id);

            // item exists
            if (idx !== -1) {
                console.log("update quantity item exist ")
                const copy = [...prev];
                const item = copy[idx];
                let newQty = item.quantity;

                if (action === 'add') newQty++;
                else if (action === 'minus') newQty--;

                if (newQty <= 0) {
                    copy.splice(idx, 1);
                    return copy;
                }

                copy[idx] = { ...item, quantity: newQty, totalPrice: product.price * newQty };
                return copy;
            }

            // item doesn't exist, only handle add
            // if (action === 'add') {
            //     console.log("update quantity item not exist exist but add  ")
            //     return [...prev, { id: product.id, product, quantity: 1, totalPrice: product.price }];
            // }

            return prev;
        });
    };
    // Get cart item count
    const getCartItemCount = () => {
        const value=cart.reduce((total, item) => total + item.quantity, 0);
        console.log("Value "+value)
        return value;
    };
    const getCartTotal = () =>{
        console.log("cart value "+cart);
        // return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const cartitem =cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        console.log("total "+cartitem);

        return cartitem;
    }
    const getQuantity = (productId) => {
        const item = cart.find(i => i.id === productId);
        return item ? item.quantity : 0;

    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartItemCount ,getCartTotal,updateQuantity,getQuantity}}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use Cart Context
export const useCart = () => {
    return useContext(CartContext);
};
