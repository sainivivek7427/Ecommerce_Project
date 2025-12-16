import React, {useState} from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,

    ScrollView,
    Dimensions
} from "react-native";
import { useCart } from "../Context/CartProvider";
import Header from "./Header";
import {FontAwesome} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import {useNavigation, useRoute} from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import {SafeAreaView} from "react-native-safe-area-context";
const screenWidth = Dimensions.get('window').width;
const CartScreen = () => {
    const { getCartItemCount, removeFromCart, getCartTotal ,cart,addToCart,updateQuantity,getQuantity} = useCart();

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
    const finalTotal = (cartTotal + gstAmount + deliveryCharges - discount).toFixed(2);
    const route = useRoute();
    const { HeaderComp } = route.params||  true;
    const navigation = useNavigation();
    const handleCheckout = () => {
        navigation.navigate("AddressScreen",{finaltotal:finalTotal.toString(),HeaderComp:false});
    }
    const renderItem = ({ item }) => {
        console.log("item. image is " + item.imageurl)
        return (<View style={styles.cartItem}>
            <View style={{width:'22%'}}>
                <Image source={{uri: item.imageurl}} style={styles.productImageDiscounts}/>
            </View>

            <View style={{display: "flex", flexDirection:'column',gap:4,justifyContent:'space-between',width:'47%'}}>
                <View>
                    <Text style={{fontSize:14}}         numberOfLines={2}
                          ellipsizeMode="tail">{item.name}</Text>
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
            <View style={{alignItems:'center',justifyContent:'center',width:'5%',display:'flex'}}>
                <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                    style={styles.cancelButton}
                >
                    <FontAwesome name="trash" size={20} color="red" />
                </TouchableOpacity>
            </View>

        </View>);


    };

    return (
        <SafeAreaView style={styles.container}>
            {HeaderComp===false? null:<Header title="Checkout Page"  />}

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

                    {/*<View style={styles.totalBox}>*/}
                    {/*    /!*<Text style={styles.totalText}>Total: ₹ {getCartTotal()}</Text>*!/*/}
                    {/*    /!*<TouchableOpacity style={styles.checkoutBtn}>*!/*/}
                    {/*    /!*    <Text style={{ color: "blue", fontSize: 20,fontWeight:'bold' }}>Checkout</Text>*!/*/}
                    {/*    /!*</TouchableOpacity>*!/*/}

                    {/*    <Text style={styles.totalText}>Subtotal: ₹ {cartTotal}</Text>*/}
                    {/*    <Text style={styles.totalText}>Discount: ₹ {discount}</Text>*/}
                    {/*    <Text style={styles.totalText}>GST (12%): ₹ {gstAmount.toFixed(2)}</Text>*/}
                    {/*    <Text style={styles.totalText}>Delivery Charges: ₹ {deliveryCharges}</Text>*/}
                    {/*    <View*/}
                    {/*        style={{*/}
                    {/*            borderTopWidth: 1,*/}
                    {/*            borderColor: "#ccc",*/}
                    {/*            marginVertical: 8,*/}
                    {/*            paddingTop: 5,*/}
                    {/*        }}*/}
                    {/*    >*/}

                    {/*    </View>*/}
                    {/*    <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',gap:'5%'}}>*/}
                    {/*        <View>*/}
                    {/*            <Text style={{ fontSize: 18, fontWeight: "bold", }}>*/}
                    {/*                Total Payable: ₹ {finalTotal.toFixed(2)}*/}
                    {/*            </Text>*/}

                    {/*        </View>*/}
                    {/*        <View>*/}
                    {/*            <TouchableOpacity style={styles.checkoutBtn}>*/}
                    {/*                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>*/}
                    {/*                    Checkout*/}
                    {/*                </Text>*/}
                    {/*            </TouchableOpacity>*/}
                    {/*        </View>*/}

                    {/*    </View>*/}

                    {/*</View>*/}

                    <View style={styles.totalBox}>
                        <Text style={styles.totalTitle}>Price Details</Text>

                        <View style={styles.priceRow}>
                            <Text style={styles.label}>Subtotal</Text>
                            <Text style={styles.value}>₹ {cartTotal}</Text>
                        </View>

                        <View style={styles.priceRow}>
                            <Text style={styles.label}>Discount</Text>
                            <Text style={[styles.value, { color: "green" }]}>− ₹ {discount}</Text>
                        </View>

                        <View style={styles.priceRow}>
                            <Text style={styles.label}>GST (12%)</Text>
                            <Text style={styles.value}>₹ {gstAmount.toFixed(2)}</Text>
                        </View>

                        <View style={styles.priceRow}>
                            <Text style={styles.label}>Delivery Charges</Text>
                            <Text style={styles.value}>₹ {deliveryCharges}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.priceRow}>
                            <Text style={styles.totalLabel}>Total Payable</Text>
                            <Text style={styles.totalValue}>₹ {finalTotal}</Text>
                        </View>

                        <TouchableOpacity style={styles.checkoutBtn} onPress={()=>navigation.navigate("AddressScreen", { finaltotalPrice:finalTotal,HeaderComp:false })}>
                            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
            </ScrollView>
            {/*<TabNavigator/>*/}
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
        marginBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: "#ccc",
        paddingBottom: 10,
        width:'100%',
        borderWidth:1,
        marginVertical: 5,
        borderRadius: 10,
        paddingVertical:7,
        paddingHorizontal:4
       },
    name: { fontSize: 16 },
    price: { fontSize: 14, fontWeight: "bold" },
    removeBtn: {
        backgroundColor: "red",
        paddingHorizontal: 4,
        paddingVertical: 10,
        borderRadius: 15,
    },
    productImageDiscounts: {
        width: '100%',
        height: '60',
        resizeMode: 'contain',
        borderColor:'2px solid red',
        borderTopWidth:3,
        borderRadius:20
    },

    totalText: { fontSize: 16, fontWeight: "bold", textAlign: "center" },

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
        color:'red !important',width:'20%'
    },
    // totalText: {
    //     fontSize: 16,
    //     marginVertical: 2,
    // },




    totalBox: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginVertical: 12,
        marginHorizontal: 0,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        width:'100%',
    },

    totalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 6,
    },

    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 6,
    },

    label: {
        fontSize: 16,
        color: "#555",
    },

    value: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },

    divider: {
        borderTopWidth: 1,
        borderColor: "#ddd",
        marginVertical: 10,
    },

    totalLabel: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#111",
    },

    totalValue: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#111",
    },

    checkoutBtn: {
        backgroundColor: "#2874F0", // Flipkart blue
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 18,
    },

    checkoutText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
});
