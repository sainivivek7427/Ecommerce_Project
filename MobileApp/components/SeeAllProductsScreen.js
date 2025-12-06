// SeeAllProductsScreen.js
import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import products from "../JsonData/Products";
import Slider from "@react-native-community/slider";

// const NUM_COLUMNS = 1;

const SeeAllProductsScreen = ({ route }) => {
    const { productsdiscount } = route.params;
    // const ITEM_MARGIN = 30;
    // const SCREEN_WIDTH = Dimensions.get('window').width*0.8;
    // const ITEM_WIDTH = (SCREEN_WIDTH- ITEM_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

    // const SCREEN_WIDTH = Dimensions.get("window").width ;
    //
    // const getNumColumns = () => {
    //     if (SCREEN_WIDTH >= 600) return 3; // tablets or big screens
    //     return 2; // normal phones
    // };
    //
    // const NUM_COLUMNS = getNumColumns();
    // const ITEM_MARGIN = 10;
    //
    // const ITEM_WIDTH =
    //     (SCREEN_WIDTH - ITEM_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const categories = [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
        "Category 5",
    ];

    const [priceRange, setPriceRange] = useState([0, 1000]);

    const SCREEN_WIDTH = Dimensions.get("window").width * 0.75;
    const NUM_COLUMNS = 2;
    const ITEM_MARGIN = 12;

    const ITEM_WIDTH =
        (SCREEN_WIDTH - (NUM_COLUMNS + 1) * ITEM_MARGIN) / NUM_COLUMNS;
    const renderProductItem = ({ item }) => (
        <View style={[styles.productCardDiscount, { width: ITEM_WIDTH }]}>
            <Image source={{ uri: item.image }} style={styles.productImageDiscount} />

            <View style={styles.productRow}>
                <Text style={styles.productNameDiscount} numberOfLines={1}>
                    {item.name}
                </Text>

                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.originalPrice}>Rs.90</Text>
                    <Text style={styles.discountedPrice}>Rs.45</Text>
                </View>
            </View>
        </View>
    );
    const toppick = [
        { id: 1, name: 'Apple', images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnFoJGb5GxF6lyge8lahGyv_nlQrXameFLsgUJAHrwCS1hDR2WdGZ6Es&s',price:'90' },
        { id: 2, name: 'Banana', images: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg' ,price:'90'},
        { id: 3, name: 'Carrot', images: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/10/carrot-juice-1296x728-header.jpg?w=1155&h=1528',price:'90' },
        { id: 4, name: 'Tomato', images: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg' ,price:'90'},
        { id: 5, name: 'Apple', images: 'https://via.placeholder.com/100?text=Apple' ,price:'90'},
        { id: 6, name: 'Banana', images: 'https://via.placeholder.com/100?text=Banana' ,price:'90'},
        { id: 7, name: 'Carrot', images: 'https://via.placeholder.com/100?text=Carrot' ,price:'90'},
        { id: 8, name: 'Tomato', images: 'https://via.placeholder.com/100?text=Tomato' ,price:'90'},
        { id: 9, name: 'Apple', images: 'https://via.placeholder.com/100?text=Apple',price:'90' },
        { id: 10, name: 'Banana', images: 'https://via.placeholder.com/100?text=Banana' ,price:'90'},
        { id: 11, name: 'Carrot', images: 'https://via.placeholder.com/100?text=Carrot' ,price:'90'},
        { id: 12, name: 'Tomato', image: 'https://via.placeholder.com/100?text=Tomato' ,price:'90'},
        { id: 13, name: 'Apple', images: 'https://via.placeholder.com/100?text=Apple' ,price:'90'},
        { id: 14, name: 'Banana', images: 'https://via.placeholder.com/100?text=Banana' ,price:'90'},
        // { id: 15, name: 'Carrot', image: 'https://via.placeholder.com/100?text=Carrot' },
        // { id: 16, name: 'Tomato', image: 'https://via.placeholder.com/100?text=Tomato' },
        // // Add more products as needed
    ];

    const cartCount=80;
    const leftItems = [
        { id: "1", name: "Vegetables", image: "https://i.imgur.com/5Z6xUuF.png" },
        { id: "2", name: "Fruits", image: "https://i.imgur.com/7yUVE6x.png" },
        { id: "3", name: "Snacks", image: "https://i.imgur.com/ZgYQ8pU.png" },
        { id: "4", name: "Beverages", image: "https://i.imgur.com/3eqXW2Y.png" },
        { id: "5", name: "Dairy Products", image: "https://i.imgur.com/vU8FOz7.png" },
        { id: "6", name: "Electronics", image: "https://i.imgur.com/u2JQfNc.png" },
        { id: "7", name: "Kitchen Essentials", image: "https://i.imgur.com/UpZtZSE.png" },
        { id: "8", name: "Home Appliances", image: "https://i.imgur.com/yxZ9uGg.png" },
        { id: "9", name: "Fast Food", image: "https://i.imgur.com/tGpKJDh.png" },
        { id: "10", name: "Beauty & Personal Care", image: "https://i.imgur.com/MuImE0G.png" },

        { id: "11", name: "Vegetables", image: "https://i.imgur.com/5Z6xUuF.png" },
        { id: "12", name: "Fruits", image: "https://i.imgur.com/7yUVE6x.png" },
        { id: "13", name: "Snacks", image: "https://i.imgur.com/ZgYQ8pU.png" },
        { id: "14", name: "Beverages", image: "https://i.imgur.com/3eqXW2Y.png" },
        { id: "15", name: "Dairy Products", image: "https://i.imgur.com/vU8FOz7.png" },
        { id: "16", name: "Electronics", image: "https://i.imgur.com/u2JQfNc.png" },
        { id: "17", name: "Kitchen Essentials", image: "https://i.imgur.com/UpZtZSE.png" },
        { id: "18", name: "Home Appliances", image: "https://i.imgur.com/yxZ9uGg.png" },
        { id: "19", name: "Fast Food", image: "https://i.imgur.com/tGpKJDh.png" },
        { id: "20", name: "Beauty & Personal Care", image: "https://i.imgur.com/MuImE0G.png" },

        { id: "21", name: "Fruits", image: "https://i.imgur.com/7yUVE6x.png" },
        { id: "22", name: "Snacks", image: "https://i.imgur.com/ZgYQ8pU.png" },
        { id: "23", name: "Beverages", image: "https://i.imgur.com/3eqXW2Y.png" },
        { id: "24", name: "Dairy Products", image: "https://i.imgur.com/vU8FOz7.png" },
        { id: "25", name: "Electronics", image: "https://i.imgur.com/u2JQfNc.png" },
        { id: "26", name: "Kitchen Essentials", image: "https://i.imgur.com/UpZtZSE.png" },
        { id: "27", name: "Home Appliances", image: "https://i.imgur.com/yxZ9uGg.png" },
        { id: "29", name: "Fast Food", image: "https://i.imgur.com/tGpKJDh.png" },
        { id: "30", name: "Beauty & Personal Care", image: "https://i.imgur.com/MuImE0G.png" },
    ];
    return (
        <View style={styles.container}>
            {/*<Text style={styles.title}>All Discounted Products</Text>*/}
            {/*<ScrollView*/}
            {/*    style={styles.leftSide}*/}
            {/*    showsVerticalScrollIndicator={false}*/}
            {/*>*/}
            {/*    /!* Many items here *!/*/}
            {/*    {leftItems.map((item) => (*/}
            {/*        <Text key={item.id} style={styles.leftItem}>{item.name}</Text>*/}
            {/*    ))}*/}
            {/*</ScrollView>*/}
            {/* LEFT SIDE */}
            <ScrollView style={styles.leftSide}>
                {leftItems.map((item) =>(
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.subCategoryBtn,
                            selectedSubCategory === item.name && styles.subCategoryBtnActive
                        ]}
                        onPress={() => setSelectedSubCategory(item.name)}
                    >
                        <Image source={{ uri: item.image }} style={styles.leftItemImage} />
                        <Text
                            style={[
                                styles.subCategoryText,
                                selectedSubCategory === item.name && styles.subCategoryTextActive
                            ]}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* RIGHT SIDE */}
            <View style={styles.rightSide}>

                {/* 🔹 TOP: Horizontal Category Buttons */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                >
                    {categories.map((cat, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.categoryBtn,
                                selectedCategory === cat ? styles.categoryBtnActive : null
                            ]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text
                                style={[
                                    styles.categoryBtnText,
                                    selectedCategory === cat ? styles.categoryBtnTextActive : null
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* 🔹 Price Range (Text + Slider) */}
                <View style={styles.priceFilterBox}>
                    <Text style={styles.priceLabel}>
                        Price Range: Rs.{priceRange[0]} - Rs.{priceRange[1]}
                    </Text>

                    <Slider
                        style={{ width: "100%", height: 20 }}
                        minimumValue={0}
                        maximumValue={2000}
                        step={50}
                        value={priceRange[1]}
                        onValueChange={(val) => setPriceRange([0, val])}
                        minimumTrackTintColor="#FF6363"
                        maximumTrackTintColor="#ccc"
                        thumbTintColor="#FF6363"
                    />
                </View>
                <FlatList
                    data={products}
                    numColumns={NUM_COLUMNS}
                    key={NUM_COLUMNS}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    renderItem={renderProductItem}
                    contentContainerStyle={{
                        paddingHorizontal: ITEM_MARGIN,
                        paddingBottom: 30,
                    }}
                />
            </View>

            {/*</ScrollView>*/}
            {/* Floating Cart Button */}
            <TouchableOpacity style={styles.floatingCartBtn}>
                {/*<MaterialIcons name="shopping-cart" />*/}
                {/*<Text style={styles.cartBtnText}>Cart</Text>*/}
                <View style={styles.cartRow}>
                    <View style={{ position: "relative" }}>
                        <MaterialIcons name="shopping-cart" size={26} color="#fff" />

                        {/* Badge */}
                        {cartCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cartCount}</Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.cartBtnText}>Cart</Text>
                </View>
            </TouchableOpacity>
            {/*<View style={styles.rightside}>*/}

            {/*</View>*/}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
    },

    leftSide: {
        width: "25%",
        backgroundColor: "#f1f1f1",

        padding: 5,
    },

    rightSide: {
        width: "75%",
        padding: 5,
    },

    productCardDiscount: {
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 15,
        marginRight:10,
        overflow: "hidden",

        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 2, height: 3 },
    },

    productImageDiscount: {
        width: "100%",
        height: 90,
        resizeMode: "cover",
    },

    productRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingVertical: 5,
    },

    productNameDiscount: {
        fontSize: 14,
        fontWeight: "600",
        flex: 1,
        marginRight: 5,
    },

    originalPrice: {
        textDecorationLine: "line-through",
        color: "#999",
        fontSize: 13,
        marginRight: 4,
    },

    discountedPrice: {
        color: "#FF4D4D",
        fontSize: 13,
        fontWeight: "600",
    },
    floatingCartBtn: {
        position: "absolute",
        bottom: 30,         // 👈 margin from bottom
        right: 70,          // 👈 margin from right side
        backgroundColor: "#FF6363",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        elevation: 5,       // shadow Android
        shadowColor: "#EFF3EA",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 3 }, // shadow iOS
    },
    badge: {
        position: "absolute",
        right: -8,
        top: -5,
        backgroundColor: "red",
        height: 18,
        minWidth: 18,
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
    },

    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "700",
    },
    cartRow: {
        flexDirection: "row",     // 👈 Makes icon + text in one row
        alignItems: "center",
        gap: 13,                    // spacing between icon and text
        paddingHorizontal:5
    },

    cartBtnText: {
        color: "#fff",
        fontSize: 18,              // 👈 Increase font size
        fontWeight: "600",
    },

    leftItem: {
        padding: 5,
        marginBottom: 5,
        backgroundColor: "#fff",
        borderRadius: 6,
    },
    leftItemActive: {
        padding: 5,
        marginBottom: 5,
        backgroundColor: "#FF6363",
        borderRadius: 6,
    },
    leftItemText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
        paddingTop:10
    },

    leftItemImage: {
        width: "100%",
        height: 55,
        marginRight: 10,
        borderRadius: 6,
        resizeMode: "cover",
    },

    productPrice: {
        fontSize: 14,
        color: '#333',
        fontWeight: '700',
        // paddingHorizontal: 8,
        // marginBottom: 8,
        // marginTop: 2,
    },
    categoryScroll: {
        marginBottom: 10,
        maxHeight: 50
    },

    categoryBtn: {
        paddingVertical: 7,
        paddingHorizontal: 14,
        backgroundColor: "#F6F6F6",   // white shows shadow better
        borderRadius: 20,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 1,
        minHeight: 45,

        // ⭐ iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        // ⭐ Android shadow
        elevation: 5,

        overflow: "visible",   // IMPORTANT: shadow works properly
    },

    categoryBtnActive: {
        backgroundColor: "#FF6363",
    },

    categoryBtnText: {
        fontSize: 17,
        color: "#333",
        fontWeight: "400",
        textAlign: "center",

        includeFontPadding: false, // ⭐ avoids Android clipping
        paddingVertical: 2,        // ⭐ gives breathing room

    },

    categoryBtnTextActive: {
        color: "#fff",
        fontWeight: "600",
    },

    priceFilterBox: {

        backgroundColor: "#fff",
        padding: 5,
        marginBottom: 14,
        borderRadius: 8,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 2 },

    },

    priceLabel: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 4,
    },

    subCategoryBtn: {
        paddingVertical: 8,
        paddingHorizontal: 5,
        backgroundColor: "white",
        borderRadius: 12,
        marginBottom: 10,
        // width: "90%",
        // alignSelf: "center",
        // borderWidth: 1,
        // borderColor: "black",
    },

    subCategoryBtnActive: {
        backgroundColor: "#FF6363",   // active fill color (blue/violet)
        borderRadius: 12,
    },

    subCategoryText: {
        fontSize: 13,
        color: "#333",
        fontWeight: "600",
        paddingTop:3
    },

    subCategoryTextActive: {
        color: "#FFFFFF",
        fontWeight: "600",
    }


});

export default SeeAllProductsScreen;