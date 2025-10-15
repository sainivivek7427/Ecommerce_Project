// import { SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Image ,Alert} from 'react-native';
// import { useCart } from './../Context/CartProvider';
// const CartScreen=()=> {
//   const { cart, addToCart, getCartItemCount } = useCart();
//   const total = cart.reduce((sum, item) => sum + item.amount, 0);
//
//   return (
//     <SafeAreaView style={styles.screenContainer}>
//       <Text style={styles.screenText}>Cart Screen</Text>
//       <Text>Total Amount: ${total}</Text>
//       {/* Render cart items here */}
//     </SafeAreaView>
//   );
// }
// export default CartScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//    screenText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   screenContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, {useState} from "react";
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView} from "react-native";
import { useCart } from "../Context/CartProvider";
import Header from "./Header";
import {FontAwesome} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";

const CartScreen = () => {
    const { getCartItemCount, removeFromCart, getCartTotal ,cart,addToCart,updateQuantity,getQuantity} = useCart();
    const [quantities, setQuantities] = useState({});

    // State for product quantities (initially 0)
    // const [productQuantities, setProductQuantities] = useState(
    //     products.reduce((acc, product) => {
    //         acc[product.id] = 0;  // Start all quantities at 0
    //         return acc;
    //     }, {})
    // );
    const [pendingProduct, setPendingProduct] = useState(null); // to store product temporarily

    // const handlequantity = (product, action) => {
    //     console.log(`Product ${product.id} action: ${action}`);
    //     const price =90;
    //     setProductQuantities(prevQuantities => {
    //         const currentQty = prevQuantities[product.id] || 0;
    //         console.log("CUrrentqty "+currentQty);
    //         let newQty = currentQty;
    //         if (action === 'add') {
    //             newQty = currentQty + 1;
    //         } else if (action === 'minus' && currentQty > 0) {
    //             newQty = currentQty - 1;
    //         }
    //         console.log("qty "+newQty)
    //
    //         const newres= setPendingProduct({ product, quantity: newQty });
    //         console.log("qty "+newres);
    //         addToCart(product,newQty,product.price*newQty);
    //         return { ...prevQuantities, [product.id]: newQty };
    //     });

        // setQuantities(prev => {
        //   const currentQty = prev[product.id] || 0;
        //   // console.log("Current quantity:  of prod "+product.id+" qty currentQty"+currentQty);

        //   let newQty = action === 'add' ? currentQty + 1 : Math.max(0, currentQty - 1);
        //     // console.log("Current quantity:  of prod "+product.id+" qty update currentQty"+newQty);
        //   // addToCart(product,newQty);
        //   setPendingProduct({ product, quantity: newQty });

        // return { ...prev, [product.id]: newQty };
        // });


        // console.log(" Quantities "+quantities.id+" name "+quantities.name)
    // };

    const discount = 6; // ₹50 discount for example
    const gstPercent = 0.12; // 18% GST
    const deliveryCharges = 10; // flat delivery fee

    const cartTotal = getCartTotal();
    const gstAmount = cartTotal * gstPercent;
    const finalTotal = cartTotal + gstAmount + deliveryCharges - discount;

    const renderItem = ({ item }) => {
        console.log("item. image is " + item.images)
        return (<View style={styles.cartItem}>
            <Image source={{uri: item.images}} style={styles.productImageDiscounts}/>
            <View style={{display: "flex", flexDirection:'column',gap:4,justifyContent:'space-between'}}>
                <View>
                    <Text style={styles.name}>{item.name} Price - {item.price}</Text>
                </View>

                <View >
                    <Text style={styles.price}>Total {getQuantity(item.id)}*₹{item.price}= ₹{getQuantity(item.id)*item.price}</Text>
                </View>
            </View>


            {/*<Text style={{backgroundColor:'black',color:'white',padding:'4',borderRadius:6}}>Qty- {item.quantity}  </Text>*/}
            <View style={styles.cartControl}>
                <TouchableOpacity onPress={() => updateQuantity(item, 'minus')}>
                    <FontAwesome name="minus" size={18} color="white"/>
                </TouchableOpacity>

                <Text style={{color: 'white'}}>{getQuantity(item.id)}</Text>

                <TouchableOpacity onPress={() => updateQuantity(item, 'add')}>
                    <FontAwesome name="plus" size={18} color="white"/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                style={styles.cancelButton}
            >
                <FontAwesome name="trash" size={20} color="red" />
            </TouchableOpacity>
        </View>);


    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Checkout Page"  />
            <ScrollView style={styles.scrollSection} contentContainerStyle={{ paddingBottom: 80 }}>
        <View >
            {cart.length === 0 ? (
                
                <Text style={styles.emptyText}>🛒 Your cart is empty</Text>

                ) : (
                <>

                    <FlatList
                        data={cart}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />

                    <View style={styles.totalBox}>
                        {/*<Text style={styles.totalText}>Total: ₹ {getCartTotal()}</Text>*/}
                        {/*<TouchableOpacity style={styles.checkoutBtn}>*/}
                        {/*    <Text style={{ color: "blue", fontSize: 20,fontWeight:'bold' }}>Checkout</Text>*/}
                        {/*</TouchableOpacity>*/}

                        <Text style={styles.totalText}>Subtotal: ₹ {cartTotal}</Text>
                        <Text style={styles.totalText}>Discount: ₹ {discount}</Text>
                        <Text style={styles.totalText}>GST (12%): ₹ {gstAmount.toFixed(2)}</Text>
                        <Text style={styles.totalText}>Delivery Charges: ₹ {deliveryCharges}</Text>
                        <View
                            style={{
                                borderTopWidth: 1,
                                borderColor: "#ccc",
                                marginVertical: 8,
                                paddingTop: 5,
                            }}
                        >

                        </View>
                        <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',gap:'5%'}}>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: "bold", }}>
                                    Total Payable: ₹ {finalTotal.toFixed(2)}
                                </Text>

                            </View>
                            <View>
                                <TouchableOpacity style={styles.checkoutBtn}>
                                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                                        Checkout
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

                </>
            )}
        </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:10
    },
    emptyText: { textAlign: "center", marginTop: 100, fontSize: 18 },
    cartItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        borderBottomWidth: 0.5,
        borderColor: "#ccc",
        paddingBottom: 10,
    },
    name: { fontSize: 16 },
    price: { fontSize: 16, fontWeight: "bold" },
    removeBtn: {
        backgroundColor: "red",
        paddingHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 15,
    },
    productImageDiscounts: {
        width: '70',
        height: '60',
        resizeMode: 'contain',
        borderColor:'2px solid red',
        borderTopWidth:3,
        borderRadius:20
    },
    totalBox: {
        borderTopWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 20,
        display:'flex',
        justifyContent:'start',
        alignItems:'flex-end',
        flexDirection:'column',
        // marginTop: 10,
        marginBottom:'0',
        bottom:0,
        backgroundColor:'#F0F8FF'
    },
    totalText: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
    checkoutBtn: {
        backgroundColor: "black",
        // marginTop: 15,
        alignSelf: "flex-end",
        // padding: 10,
        borderRadius: 15,
        paddingVertical:10,
        paddingHorizontal:20
    },
    cartControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 15,
        elevation: 2,
        gap: 10,
        marginBottom:5,
        color:'red !important',
    },
    // totalText: {
    //     fontSize: 16,
    //     marginVertical: 2,
    // },
});
