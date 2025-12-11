import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProductDetailsScreen({ route, navigation }) {
    const { product } = route.params;
    const [qty, setQty] = useState(1);
    const [wishlist, setWishlist] = useState(false);

    return (
        <View style={{ flex: 1, padding: 16 }}>

            {/* Product Image */}
            <Image
                source={{ uri: product.imageurl }}
                style={styles.productImage}
            />

            {/* Name + Wishlist */}
            <View style={styles.row}>
                <Text style={styles.name}>{product.name}</Text>

                <TouchableOpacity onPress={() => setWishlist(!wishlist)}>
                    <MaterialIcons
                        name={wishlist ? "favorite" : "favorite-border"}
                        size={28}
                        color={wishlist ? "red" : "black"}
                    />
                </TouchableOpacity>
            </View>

            {/* Price */}
            <View style={styles.priceRow}>
                <Text style={styles.originalPrice}>Rs.90</Text>
                <Text style={styles.discountPrice}>Rs.70</Text>
            </View>

            {/* Description */}
            <Text style={styles.description}>{product.description}</Text>

            {/* Add to Cart Section */}
            <View style={styles.cartRow}>
                <View style={{display: "flex", justifyContent: "space-between",flexDirection: "row",alignItems: "center"}}>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => qty > 1 && setQty(qty - 1)}
                    >
                        <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyValue}>{qty}</Text>

                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => setQty(qty + 1)}
                    >
                        <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={styles.addToCartBtn}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>

            {/* Show All Products */}
            <TouchableOpacity
                style={styles.allProductsBtn}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.allProductsText}>Show All Products</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    productImage: {
        width: "100%",
        height: 250,
        borderRadius: 10,
        resizeMode: "cover",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
    },
    priceRow:{
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
        gap:3
    },
    name: {
        fontSize: 22,
        fontWeight: 500,
        flex: 1,
    },
    originalPrice: {
        textDecorationLine: "line-through",
        color: "gray",
        fontSize: 16,
        marginRight: 10,
    },
    discountPrice: {
        fontSize: 18,
        color: "green",
        fontWeight: "bold",
    },
    description: {
        marginTop: 12,
        fontSize: 15,
        color: "#555",
    },
    cartRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    qtyBtn: {
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ddd",
        borderRadius: 5,
    },
    qtyText: {
        fontSize: 20,
    },
    qtyValue: {
        fontSize: 20,
        marginHorizontal: 12,
        fontWeight:700
    },
    addToCartBtn: {
        backgroundColor: "#FF6363",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        marginLeft: 20,

    },
    addToCartText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

    allProductsBtn: {
        marginTop: 30,
        backgroundColor: "#FF6363",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom:0,
        position: "absolute",
        bottom:35,
        width:"100%",
        marginHorizontal:"4%",
    },
    allProductsText: {
        color: "white",
        fontSize: 17,
        fontWeight: "700",
    },
});
