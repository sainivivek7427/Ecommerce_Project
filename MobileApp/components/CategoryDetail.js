import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    SafeAreaView,
    StyleSheet,
    Dimensions, FlatList
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useCart} from "../Context/CartProvider";
import {useWishlist} from "../Context/WishlistContext";
const categories = [
    {
        "id": "groceries",
        "name": "Groceries",
        "imageurl": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
    },
    {
        "id": "electronics",
        "name": "Electronics",
        "imageurl": "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg"
    },
    {
        "id": "fashion",
        "name": "Fashion",
        "imageurl": "https://images.pexels.com/photos/377058/pexels-photo-377058.jpeg"
    },
    {
        "id": "books",
        "name": "Books",
        "imageurl": "https://images.pexels.com/photos/159711/pexels-photo-159711.jpeg"
    },
    {
        "id": "home_appliances",
        "name": "Home Appliances",
        "imageurl": "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg"
    }
]
const subcategories=[
    { "id": "fruits_veggies", "name": "Fruits & Vegetables", "imageurl": "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg", "category_id": "groceries" },
    { "id": "dairy", "name": "Dairy Products", "imageurl": "https://images.pexels.com/photos/236701/pexels-photo-236701.jpeg", "category_id": "groceries" },
    { "id": "snacks", "name": "Snacks & Beverages", "imageurl": "https://images.pexels.com/photos/36567/pexels-photo.jpg", "category_id": "groceries" },

    { "id": "mobiles", "name": "Mobile Phones", "imageurl": "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", "category_id": "electronics" },
    { "id": "laptops", "name": "Laptops & Computers", "imageurl": "https://images.pexels.com/photos/18105/pexels-photo.jpg", "category_id": "electronics" },
    { "id": "cameras", "name": "Cameras", "imageurl": "https://images.pexels.com/photos/51383/camera-digital-camera-photo-photography-51383.jpeg", "category_id": "electronics" },

    { "id": "mens_clothing", "name": "Men's Clothing", "imageurl": "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg", "category_id": "fashion" },
    { "id": "womens_clothing", "name": "Women's Clothing", "imageurl": "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg", "category_id": "fashion" },
    { "id": "accessories", "name": "Accessories", "imageurl": "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg", "category_id": "fashion" },

    { "id": "fiction", "name": "Fiction", "imageurl": "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg", "category_id": "books" },
    { "id": "non_fiction", "name": "Non-Fiction", "imageurl": "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg", "category_id": "books" },
    { "id": "academic", "name": "Academic", "imageurl": "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg", "category_id": "books" },

    { "id": "kitchen_appliances", "name": "Kitchen Appliances", "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg", "category_id": "home_appliances" },
    { "id": "cleaning_appliances", "name": "Cleaning Appliances", "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg", "category_id": "home_appliances" },
    { "id": "heating_cooling", "name": "Heating & Cooling", "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg", "category_id": "home_appliances" }
]

const products=[
    { "id": "apple_001", "name": "Fresh Apples", "price": 120, "unit": "1 kg", "stock": 50, "imageurl": "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg", "category_id": "groceries", "subcategory_id": "fruits_veggies" },
    { "id": "tomato_002", "name": "Red Tomatoes", "price": 60, "unit": "1 kg", "stock": 70, "imageurl": "https://images.pexels.com/photos/8390/food-wood-tomatoes.jpg", "category_id": "groceries", "subcategory_id": "fruits_veggies" },

    { "id": "milk_001", "name": "Cow Milk", "price": 55, "unit": "1 L", "stock": 100, "imageurl": "https://images.pexels.com/photos/236701/pexels-photo-236701.jpeg", "category_id": "groceries", "subcategory_id": "dairy" },
    { "id": "butter_002", "name": "Salted Butter", "price": 90, "unit": "500 g", "stock": 40, "imageurl": "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg", "category_id": "groceries", "subcategory_id": "dairy" },

    { "id": "chips_001", "name": "Potato Chips", "price": 40, "unit": "Pack", "stock": 150, "imageurl": "https://images.pexels.com/photos/4109230/pexels-photo-4109230.jpeg", "category_id": "groceries", "subcategory_id": "snacks" },
    { "id": "cola_002", "name": "Cola Drink 500ml", "price": 35, "unit": "Bottle", "stock": 200, "imageurl": "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg", "category_id": "groceries", "subcategory_id": "snacks" },

    { "id": "mobile_001", "name": "iPhone 15 Pro", "price": 139999, "stock": 20, "imageurl": "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", "category_id": "electronics", "subcategory_id": "mobiles" },
    { "id": "mobile_002", "name": "Samsung Galaxy S24", "price": 119999, "stock": 25, "imageurl": "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg", "category_id": "electronics", "subcategory_id": "mobiles" },

    { "id": "laptop_001", "name": "MacBook Air M3", "price": 129999, "stock": 15, "imageurl": "https://images.pexels.com/photos/18105/pexels-photo.jpg", "category_id": "electronics", "subcategory_id": "laptops" },
    { "id": "laptop_002", "name": "HP Pavilion 15", "price": 69999, "stock": 25, "imageurl": "https://images.pexels.com/photos/18105/pexels-photo.jpg", "category_id": "electronics", "subcategory_id": "laptops" },

    { "id": "camera_001", "name": "Canon EOS 1500D", "price": 48999, "stock": 30, "imageurl": "https://images.pexels.com/photos/51383/camera-digital-camera-photo-photography-51383.jpeg", "category_id": "electronics", "subcategory_id": "cameras" },
    { "id": "camera_002", "name": "Nikon D5600", "price": 52999, "stock": 18, "imageurl": "https://images.pexels.com/photos/51383/camera-digital-camera-photo-photography-51383.jpeg", "category_id": "electronics", "subcategory_id": "cameras" },

    { "id": "shirt_001", "name": "Cotton Casual Shirt", "price": 999, "stock": 100, "imageurl": "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg", "category_id": "fashion", "subcategory_id": "mens_clothing" },
    { "id": "jeans_002", "name": "Slim Fit Jeans", "price": 1499, "stock": 80, "imageurl": "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg", "category_id": "fashion", "subcategory_id": "mens_clothing" },

    { "id": "dress_001", "name": "Floral Summer Dress", "price": 1299, "stock": 60, "imageurl": "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg", "category_id": "fashion", "subcategory_id": "womens_clothing" },
    { "id": "saree_002", "name": "Silk Saree", "price": 2499, "stock": 40, "imageurl": "https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg", "category_id": "fashion", "subcategory_id": "womens_clothing" },

    { "id": "watch_001", "name": "Analog Wrist Watch", "price": 2499, "stock": 70, "imageurl": "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg", "category_id": "fashion", "subcategory_id": "accessories" },
    { "id": "belt_002", "name": "Leather Belt", "price": 799, "stock": 100, "imageurl": "https://images.pexels.com/photos/19090/pexels-photo.jpg", "category_id": "fashion", "subcategory_id": "accessories" },

    { "id": "book_001", "name": "The Great Gatsby", "price": 499, "stock": 120, "imageurl": "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg", "category_id": "books", "subcategory_id": "fiction" },
    { "id": "book_002", "name": "Harry Potter Series", "price": 1599, "stock": 30, "imageurl": "https://images.pexels.com/photos/159711/pexels-photo-159711.jpeg", "category_id": "books", "subcategory_id": "fiction" },

    { "id": "book_003", "name": "Atomic Habits", "price": 699, "stock": 50, "imageurl": "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg", "category_id": "books", "subcategory_id": "non_fiction" },
    { "id": "book_004", "name": "The Psychology of Money", "price": 599, "stock": 45, "imageurl": "https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg", "category_id": "books", "subcategory_id": "non_fiction" },

    { "id": "book_005", "name": "Mathematics for Engineers", "price": 899, "stock": 35, "imageurl": "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg", "category_id": "books", "subcategory_id": "academic" },
    { "id": "book_006", "name": "Computer Science Basics", "price": 1099, "stock": 40, "imageurl": "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg", "category_id": "books", "subcategory_id": "academic" },

    { "id": "mixer_001", "name": "Mixer Grinder", "price": 3499, "stock": 45, "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg", "category_id": "home_appliances", "subcategory_id": "kitchen_appliances" },
    { "id": "toaster_002", "name": "Electric Toaster", "price": 1999, "stock": 60, "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg", "category_id": "home_appliances", "subcategory_id": "kitchen_appliances" },

    { "id": "vacuum_001", "name": "Vacuum Cleaner", "price": 4999, "stock": 25, "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg", "category_id": "home_appliances", "subcategory_id": "cleaning_appliances" },
    { "id": "steam_002", "name": "Steam Iron", "price": 1599, "stock": 40, "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg", "category_id": "home_appliances", "subcategory_id": "cleaning_appliances" },

    { "id": "ac_001", "name": "Split Air Conditioner", "price": 37999, "stock": 20, "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg", "category_id": "home_appliances", "subcategory_id": "heating_cooling" },
    { "id": "heater_002", "name": "Room Heater", "price": 2999, "stock": 35, "imageurl": "https://images.pexels.com/photos/276024/pexels-photo-276024.jpeg", "category_id": "home_appliances", "subcategory_id": "heating_cooling" }
]

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
const LOGO_WIDTH = 100;
const LOGO_MARGIN_RIGHT = 12;
const SCROLL_STEP = (LOGO_WIDTH + LOGO_MARGIN_RIGHT) * 3;
const CategoryDetail = () => {
    const { addToWishlist, removeFromWishlist, isInWishlist,wishlist } = useWishlist();
    const { addToCart ,cart,updateQuantity,removeFromCart} = useCart();
    const route = useRoute();
    const { category } = route.params;
    // const [wishlist, setWishlist] = useState([]);


    const [productsPick,setProductsPick] = useState(products);
    useEffect(() => {
        console.log(category);
        // console.log(category)
        const productRes = products.filter(
            (product) => product.category_id === category.id
        );
        setProductsPick(productRes);
    }, [products, category]);
    const scrollViewRef = useRef(null);
    const [currentScrollX, setCurrentScrollX] = useState(0);
    const [maxScrollX, setMaxScrollX] = useState(0);

    const NUM_COLUMNS = 2;
    const onScroll = (e) => {
        setCurrentScrollX(e.nativeEvent.contentOffset.x);
    };
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


    const navigation = useNavigation();

// We capture max scrollable width on content size change
    const onContentSizeChange = (contentWidth, contentHeight) => {
        const screenWidth = Dimensions.get('window').width;
        setMaxScrollX(contentWidth - screenWidth + 32);
        // +32 is padding left + right on container (if you keep 16 each side),
        // adjust accordingly depending on your actual container padding
    };
    const scrollRight = () => {
        if (scrollViewRef.current) {
            let newX = currentScrollX + SCROLL_STEP;
            if (newX > maxScrollX) {
                newX = maxScrollX;
            }
            scrollViewRef.current.scrollTo({ x: newX, animated: true });
            setCurrentScrollX(newX);
        }
    };
    const getQuantity = (productId) => {
        const item = cart.find((i) => i.id === productId);
        return item ? item.quantity : 0;
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

    function handleSubcategories(productId) {
        console.log(productId);

        const productsFilter=products.filter(product=>product.subcategory_id === productId.id);
        console.log("Product is "+productsFilter.length);
        console.log(productsFilter);
        setProductsPick(productsFilter);
    }


    // const onSeeAlldiscount50 = () => {
    //     // alert('See All clicked!');
    //     navigation.navigate('ProductDescription', { productsdiscount: products });
    // };
    function handleProductDescription(item) {
        navigation.navigate('ProductDescription', { productBasedCategories: item });
    }

    const renderItem = ({ item }) => {
        // let item;
        const qty = getQuantity(item.id);


        return (
            <View style={styles.productCardpicks}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={()=>handleProductDescription(item)}>
                        <Image source={{uri: item.imageurl}} style={styles.productsImage}/>
                    </TouchableOpacity>


                    {/* Wishlist icon */}


                    {/* Cart control */}
                    <View style={styles.iconWrapper}>
                        {qty === 0 ? (
                            <TouchableOpacity
                                style={styles.addtoCart}
                                onPress={() => handlequantity(item, "add")}
                            >
                                <MaterialIcons name="add" size={20} color="red"/>
                                <Text style={{color: "red"}}>Add</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.cartControl}>
                                <TouchableOpacity onPress={() => handlequantity(item, "minus")}>
                                    <FontAwesome name="minus" size={18} color="white"/>
                                </TouchableOpacity>

                                <Text style={styles.qtyText}>{qty}</Text>

                                <TouchableOpacity onPress={() => handlequantity(item, "add")}>
                                    <FontAwesome name="plus" size={18} color="white"/>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
                <Text style={styles.productNameDiscount} numberOfLines={1}>
                    {item.name}
                </Text>
                {/* Name + Prices */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 2,
                        paddingVertical: 2,
                        paddingHorizontal: 3,
                    }}
                >

                    <View style={{flexDirection: "row", paddingHorizontal: 6}}>
                        <Text style={styles.originalPrice}>Rs.90</Text>
                        <Text style={styles.discountedPrice}>{item.price}</Text>
                    </View>
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
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Sub Categories of {category.name}</Text>
                {/*<TouchableOpacity onPress={()=>Alert.alert("CLikec see all text")}>*/}
                {/*    <Text style={styles.seeAllText}>See All</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
            <View style={styles.logoScrollWrapper}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.logoScrollContainer}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    onContentSizeChange={onContentSizeChange}
                >
                    {/*{products.map((product) => (*/}
                    {/*    <View key={product.id} style={styles.logoWrapper}>*/}
                    {/*        <Image source={{ uri: product.image }} style={styles.logoImage} />*/}
                    {/*        <Text style={{fontSize:12,fontWeight:600,textAlign:'center'}}>{product.name}</Text>*/}
                    {/*    </View>*/}
                    {/*))}*/}



                    {category.subcategories.map((product) => {
                        // const quantity = productQuantities[product.id];
                        // const qty = getQuantity(product.id);
                        return(
                            <View style={styles.productCard}>
                                <View style={styles.imageContainer}>
                                    <TouchableOpacity onPress={() => handleSubcategories(product)}>
                                    <Image source={{uri: product.imageurl}} style={styles.productImage1}/>
                                    </TouchableOpacity>

                                </View>

                                {/* Name + Prices */}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginVertical: 2,
                                        paddingVertical: 2,
                                        paddingHorizontal: 7,
                                    }}
                                >
                                    <Text style={styles.productNameDiscount} numberOfLines={1}>
                                        {product.name}
                                    </Text>

                                </View>
                            </View>


                            // <View key={product.id} style={styles.productCardTopPicks}>
                            //     <TouchableOpacity onPress={()=>handleSubcategories(product.id)}>
                            //     <View style={styles.imageContainer}>
                            //
                            //         <Image source={{ uri: product.imageurl}} style={styles.productImage1}  />
                            //         {/* Overlay heart and cart quantity controls in top right */}
                            //         {/* Icons over image */}
                            //         {/*</TouchableOpacity>*/}
                            //
                            //     </View>
                            //     {/* Name and price below image */}
                            //     <View style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between',marginVertical:2,paddingVertical:2,paddingHorizontal:7}}>
                            //         <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            //             <View>
                            //                 <Text style={styles.productNameDiscount} numberOfLines={1}>
                            //                     {product.name}
                            //                 </Text>
                            //             </View>
                            //
                            //         </View>
                            //
                            //     </View>
                            //         </TouchableOpacity>
                            //
                            // </View>
                        );
                    })}
                </ScrollView>
            </View>

            <Text style={{fontSize:18,fontWeight:'bold',backgroundColor:'green',color:'white',padding:10,borderRadius:10,marginBottom:18}}>
                {category.name} Products
            </Text>
            <FlatList
                data={productsPick}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={NUM_COLUMNS}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            {/*<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>*/}
            {/*    {productsPick.map((product) => {*/}
            {/*        // const quantity = productQuantities[product.id];*/}

            {/*        return(*/}
            {/*            <View key={product.id} style={styles.productCard}>*/}
            {/*                <View style={styles.imageContainer}>*/}
            {/*                    <Image source={{ uri: product.imageurl }} style={styles.productImage}  />*/}
            {/*                    /!* Overlay heart and cart quantity controls in top right *!/*/}
            {/*                    /!* Icons over image *!/*/}
            {/*                    <View style={styles.iconWrapperHeart}>*/}
            {/*                        /!*<TouchableOpacity style={styles.iconButton}>*!/*/}
            {/*                        /!*    <FontAwesome name="heart" size={20} color="red" />*!/*/}
            {/*                        /!*</TouchableOpacity>*!/*/}
            {/*                        <TouchableOpacity onPress={() => handleWishlist(product.id, product.name)}>*/}
            {/*                            <Ionicons*/}
            {/*                                name={wishlist.includes(product.id) ? "heart" : "heart-outline"}*/}
            {/*                                size={24}*/}
            {/*                                color={wishlist.includes(product.id) ? "red" : "gray"}*/}
            {/*                            />*/}
            {/*                        </TouchableOpacity>*/}
            {/*                    </View>*/}
            {/*                    <View style={styles.iconWrapper}>*/}
            {/*                        /!*{quantity === 0 ? (*!/*/}
            {/*                            <TouchableOpacity style={styles.addtoCart} onPress={() => handlequantity(product, 'add')}>*/}
            {/*                                <MaterialIcons name="add" size={20} color="red" />*/}
            {/*                                <Text style={{color:"red"}}>Add</Text>*/}
            {/*                            </TouchableOpacity>*/}
            {/*                        /!*) : (*!/*/}
            {/*                        /!*    <View style={styles.cartControl}>*!/*/}
            {/*                        /!*        <TouchableOpacity onPress={() => handlequantity(product, 'minus')}>*!/*/}
            {/*                        /!*            <FontAwesome name="minus" size={18} color="white"  />*!/*/}
            {/*                        /!*        </TouchableOpacity>*!/*/}

            {/*                        /!*        <Text style={styles.qtyText}>{quantity}</Text>*!/*/}

            {/*                        /!*        <TouchableOpacity onPress={() => handlequantity(product, 'add')}>*!/*/}
            {/*                        /!*            <FontAwesome name="plus" size={18} color="white"  />*!/*/}
            {/*                        /!*        </TouchableOpacity>*!/*/}
            {/*                        /!*    </View>*!/*/}
            {/*                        /!*)}*!/*/}
            {/*                    </View>*/}

            {/*                </View>*/}
            {/*                <View style={{ flex: 1 ,flexDirection: 'row', justifyContent: 'space-between',marginBottom: 4,paddingHorizontal:10}}>*/}
            {/*                    <Text style={styles.productName}>{product.name}</Text>*/}
            {/*                    <Text style={styles.priceText}>₹99</Text>*/}
            {/*                </View>*/}
            {/*                /!*<Text style={styles.title}>title</Text>*!/*/}
                            {/*/!* Name and price row below image *!/*/}
            {/*                /!*<View style={{display: 'flex', flexDirection: 'column', width: '100%', marginTop: 8 }}>*!/*/}
            {/*                /!* <Text style={styles.productName}>{product.name}</Text>*/}
            {/*    <Text style={styles.priceText}>₹99</Text>*/}
            {/*     *!/*/}

            {/*                /!*  <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>*!/*/}
            {/*                /!*    /!* Example rating: 4 stars *!/*!/*/}
            {/*                /!*    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 6 }}>*!/*/}
            {/*                /!*      {[...Array(5)].map((_, i) => (*!/*/}
            {/*                /!*        <Ionicons key={i} name="star" size={16} color="#FFD700" />*!/*/}
            {/*                /!*      ))}*!/*/}
            {/*                /!*    </View>*!/*/}
            {/*                /!*    /!* Heart icon for wishlist (optional, if you want another here) *!/*!/*/}
            {/*                /!*    <TouchableOpacity onPress={() => handleWishlist(product.id, product.name)}>*!/*/}
            {/*                /!*      <Ionicons*!/*/}
            {/*                /!*        name={wishlist.includes(product.id) ? "heart" : "heart-outline"}*!/*/}
            {/*                /!*        size={24}*!/*/}
            {/*                /!*        color={wishlist.includes(product.id) ? "red" : "gray"}*!/*/}
            {/*                /!*      />*!/*/}
            {/*                /!*    </TouchableOpacity>*!/*/}
            {/*                /!*  </View>*!/*/}
            {/*                /!*</View>*!/*/}
            {/*            </View>*/}
            {/*        );*/}
            {/*    })}*/}
            {/*</View>*/}
        </SafeAreaView>

    );
};

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor:"#FF6363",
        padding:5,
        borderRadius:20,
        paddingHorizontal:15,
        paddingVertical:15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'white'
    },
    seeAllText: {
        fontSize: 16,
        color: '#007bff',
    },
    logoScrollWrapper: {
        position: 'relative',
    },
    logoScrollContainer: {
        paddingVertical: 10,
    },
    scrollSection: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
    },

    cartControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 7,
        paddingVertical: 10,
        borderRadius: 10,
        elevation: 2,
        gap: 20,
        marginBottom:5
    },
    productCardTopPicks: {
        width: '20%',
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        marginBottom: 15,
        marginHorizontal:3


    },
    productImage: {
        width: "10%",
        height: 120,
        borderRadius: 10,
        marginBottom: 8,

    },
    productsImage:{
        width: "100%",
        height: 120,
        borderRadius: 10,
        marginBottom: 8,
    },
    imageContainer: {
        position: 'relative',
        objectFit: 'fill',
        // backgroundColor: 'red',
    },
    productImage1: {
        width: "100%",
        height: 60,
        objectFit:'fill',
        borderRadius: 10,
        marginBottom: 8,
    },
    // iconWrapperHeart:{
    //     position: 'absolute',
    //     right: 10,
    //     top: 3,
    //     alignItems: 'center',
    // },
    iconWrapper: {
        position: 'absolute',
        right: 10,
        bottom: 5,
        alignItems: 'center',
    },
    iconWrappertoppicks: {
        position: 'absolute',

        top:0,
        right:10,
        alignItems: 'center',

    },
    productCard: {
        width: '30%',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 15,
        marginRight:10
        // borderColor:'2px solid blue',

    },
    productCardpicks:{
        width: '46%',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        marginBottom: 15,
        marginRight:10
    },
    addtoCart : {
        flexDirection:"row",backgroundColor:"white",paddingHorizontal:7,paddingVertical:4,alignItems:"center",marginBottom:6,borderWidth: 2,
        borderColor: 'red', // Blue border outline
        borderRadius: 8,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

        // Shadow for Android
        elevation: 9,
    },
    productNameDiscount: {
        fontWeight: '600',
        fontSize: 14,
        paddingLeft:7
        // marginTop: 8,
        // paddingHorizontal: 8,
    },
    productPrice: {
        fontSize: 14,
        color: '#333',
        fontWeight: '700',
        // paddingHorizontal: 8,
        // marginBottom: 8,
        // marginTop: 2,
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#999',
        fontSize: 13,
        marginRight: 4,
        fontWeight: '400',
    },
    discountedPrice: {
        color: '#FF4D4D', // or your discount color
        fontSize: 13,
        fontWeight: '600',
    },
    logoWrapper: {
        marginRight: LOGO_MARGIN_RIGHT,
        borderRadius: LOGO_WIDTH / 2.3,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        shadowColor: '#121',
        shadowOffset: { width: 9, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        // Optional elevation (Android)
        elevation: 5,
    },
    logoImage: {
        width: LOGO_WIDTH,
        height: LOGO_WIDTH,
        borderRadius: LOGO_WIDTH / 4,
    },
    rightIconWrapper: {
        position: 'absolute',
        right: 0,
        top: '50%',
        marginTop: -15, // half icon size for vertical center
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 15,
        zIndex: 1,
        elevation: 5,
    },

    priceText: {
        fontWeight: 'bold',
        color: '#388e3c',
        fontSize: 16,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

})
export default CategoryDetail;

