import {Alert, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Image} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import React, {useState,useRef} from "react";
import {useCart} from "../Context/CartProvider";
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useWishlist} from "../Context/WishlistContext";
import products from "../JsonData/Products";
// import {
//     SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions,
//     ScrollView, Image, Alert, FlatList, TextInput, Animated
// } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ProductDescrption = () => {
    const { addToCart ,cart,updateQuantity,removeFromCart,getQuantity} = useCart();
    const route = useRoute();
    const {productBasedCategories} = route.params;
    const { addToWishlist, removeFromWishlist, isInWishlist,wishlist } = useWishlist();
    // const { addToWishlist, removeFromWishlist, isInWishlist,wishlist } = useWishlist();
    const handleWishlist = (product) => {
        console.log(`Toggling wishlist for product ID: ${product.id}, Name: ${product.name}`);
        // // setWishlist((prev) =>
        // //   prev.includes(product.id)
        // //     ? prev.filter(id => id !== product.id)
        // //     : [...prev, product.id]
        // //
        // // );
        //   addToWishlist(product);
        // // if (isInWishlist(product.id)) {
        // //     console.log("existing to wish lishslist")
        // //     removeFromWishlist(product.id);
        // // } else {
        // //     console.log("wishlist exist found")
        // //     addToWishlist(product);
        // // }

        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            console.log("Removed from wishlist ✅");
        } else {
            addToWishlist(product);
            console.log("Added to wishlist ✅");
        }
        //Api call
        console.log(`Product ${product.id} and product name ${product.name} added to wishlist`);

    };
    // useEffect(() => {
    //   console.log("wishlist updated: ", wishlist);
    // }, [wishlist]);
    const prod = {
        id: 'p1',
        name: 'Sample Leather Backpack',
        description:
            'A durable, water-resistant leather backpack with multiple compartments and padded straps for comfortable all-day wear.',
        images: [
            'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
            'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
            'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg',
        ],
    };
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const navigation = useNavigation();


    const flatListRef = useRef(null);


    const handleViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;


    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const renderImage = ({ item }) => {
        return(
            <View style={{position:'relative'}}>
            <Image
                source={{uri: item}}
                style={styles.image}
                resizeMode="cover"
            />
        <View style={styles.iconWrapperHeart}>
            <TouchableOpacity onPress={() => handleWishlist(item)}>
                <Ionicons
                    name={wishlist.some(w => w.id === item.id) ? "heart" : "heart-outline"}
                    size={24}
                    color={wishlist.some(w => w.id === item.id) ? "red" : "gray"}
                />
            </TouchableOpacity>
        </View>
            </View>
            );

    };
    const handlequantity = (product, action) => {
        const qty = getQuantity(product.id);
        let newQty = qty;

        if (action === "add") {
            newQty = qty + 1;
            addToCart(product, newQty, product.price * newQty);
        } else if (action === "minus") {
            if (qty > 1) {
                updateQuantity(product, "minus");
            } else {
                removeFromCart(product.id);
            }
        }
    };
    const qty=getQuantity(productBasedCategories.id);
    return (
        <SafeAreaView style={styles.container}>
            {/* Image carousel */}
            <View style={styles.carouselContainer}>

                {prod.images.length > 1 ? (
                    <>
                        <FlatList
                            ref={flatListRef}
                            data={prod.images}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => `${prod.id}-img-${index}`}
                            renderItem={renderImage}
                            onViewableItemsChanged={handleViewableItemsChanged}
                            viewabilityConfig={viewConfigRef.current}
                        />
                        {/* Dots only if multiple images */}
                        <View style={styles.dotsContainer}>
                            {prod.images.map((_, i) => (
                                <View
                                    key={`dot-${i}`}
                                    style={[
                                        styles.dot,
                                        i === currentIndex ? styles.dotActive : null,
                                    ]}
                                />
                            ))}
                        </View>
                    </>
                ) : (
                    // ✅ Single image (no carousel, no dots)
                    <Image
                        source={{ uri: productBasedCategories.imageurl }}
                        style={styles.image}
                        resizeMode="cover"
                    />)}
                {/*<FlatList*/}
                {/*    ref={flatListRef}*/}
                {/*    data={prod.images}*/}
                {/*    horizontal*/}
                {/*    pagingEnabled*/}
                {/*    showsHorizontalScrollIndicator={false}*/}
                {/*    keyExtractor={(item, index) => `${prod.id}-img-${index}`}*/}
                {/*    renderItem={renderImage}*/}
                {/*    onViewableItemsChanged={handleViewableItemsChanged}*/}
                {/*    viewabilityConfig={viewConfigRef.current}*/}
                {/*/>*/}
                {/*/!* Dots *!/*/}
                {/*<View style={styles.dotsContainer}>*/}
                {/*    {prod.images.map((_, i) => (*/}
                {/*        <View*/}
                {/*            key={`dot-${i}`}*/}
                {/*            style={[*/}
                {/*                styles.dot,*/}
                {/*                i === currentIndex ? styles.dotActive : null,*/}
                {/*            ]}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</View>*/}
            </View>


            {/* Product info */}
            <View style={styles.infoContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.name}>{productBasedCategories.name}</Text>
                    {/*<TouchableOpacity onPress={toggleWishlist} style={styles.wishButton}>*/}
                    {/*    <Text style={styles.wishText}>{isWishlisted ? '♥' : '♡'}</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>


                <Text style={styles.description}>{prod.description}</Text>


                {/*<View style={styles.actionsRow}>*/}
                {/*    <TouchableOpacity style={styles.cartButton} onPress={()=>Alert.alert("CLicked")}>*/}
                {/*        <Text style={styles.cartButtonText}>Add to Cart</Text>*/}
                {/*    </TouchableOpacity>*/}



                {/*</View>*/}
                <View style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:10}}>
                    <View style={{color:'black',width:'40%',display:'flex','justifyContent':'center',alignItems:'start'}}>
                        <Text style={{fontWeight:'bold',fontStyle:'normal',fontSize:16}}>Price: {productBasedCategories.price}</Text>
                    </View>
                    <View style={{width:'33%'}}>
                        {qty === 0 ? (
                            <TouchableOpacity
                                style={styles.addtoCart}
                                onPress={() => handlequantity(productBasedCategories, "add")}
                            >
                                <MaterialIcons name="add" size={20} color="red"/>
                                <Text style={{color: "red"}}>Add</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.cartControl}>
                                <TouchableOpacity onPress={() => handlequantity(productBasedCategories, "minus")}>
                                    <FontAwesome name="minus" size={18} color="white"/>
                                </TouchableOpacity>

                                <Text style={styles.qtyText}>{qty}</Text>

                                <TouchableOpacity onPress={() => handlequantity(productBasedCategories, "add")}>
                                    <FontAwesome name="plus" size={18} color="white"/>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                </View>
                <View style={styles.cartContainer}>
                    {qty > 0 && (
                        <TouchableOpacity
                            style={styles.cartButton}
                            onPress={() => navigation.navigate("CartPage", { HeaderComp: false })}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="cart" size={22} color="#fff" style={{ marginRight: 8 }} />
                            <Text style={styles.cartButtonText}>Go to Cart</Text>
                        </TouchableOpacity>
                    )}
                </View>
                {/*<View style={{width:'80%',margin:'auto'}}>*/}
                {/*    {*/}
                {/*        qty>0?(*/}
                {/*            <TouchableOpacity*/}
                {/*                style={styles.addtoCart}*/}
                {/*                onPress={() => navigation.navigate("CartPage",{ HeaderComp: false })}*/}
                {/*            >*/}

                {/*                <Text style={{color: "red",fontSize:20,width:'100%',padding:12,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>Move to Cart Page</Text>*/}
                {/*            </TouchableOpacity>*/}
                {/*        ):(<View></View>)*/}
                {/*    }*/}
                {/*</View>*/}
            </View>
        </SafeAreaView>
    );

}

export default ProductDescrption;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    carouselContainer: {
        height: SCREEN_WIDTH * 0.9,
    },
    image: {
        width: SCREEN_WIDTH,
        height: '100%',
        position:'relative',

    },
    dotsContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: '#333',
        width: 10,
        height: 10,
    },
    infoContainer: {
        flex: 1,
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        flex: 1,
        marginRight: 12,
    },
    wishButton: {
        padding: 8,
    },
    wishText: {
        fontSize: 22,
    },
    description: {
        marginTop: 12,
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
    actionsRow: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },

    buyButton: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    cartControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        elevation: 4,
        gap: 17,
        marginBottom:5,
        color:'red !important',width:'90%'
    },

    addtoCart : {
        flexDirection:"row",backgroundColor:"white",paddingHorizontal:15,paddingVertical:4,alignItems:"center",marginBottom:6,borderWidth: 2,
        borderColor: 'red', // Blue border outline
        borderRadius: 8,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

        // Shadow for Android
        elevation: 9,
        width:'90%'
    },
    iconWrapperHeart: {
        position: 'absolute',

        top:0,
        right:10,
        alignItems: 'center',

    },


    cartContainer: {
        width: "100%",
        alignItems: "center",
        marginVertical: 20,
    },

    cartButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2874F0", // Flipkart blue
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        width: "90%",
    },

    cartButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});