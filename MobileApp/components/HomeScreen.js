import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect, useRef,} from 'react';
import {
    StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions,
    ScrollView, Image, Alert, FlatList, TextInput, Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import CategoryGrid  from "./CategoryGrid";
import Carousel from 'react-native-reanimated-carousel';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Header from './Header'; // Assuming HomeScreen is exported from this file
import BottomBar from '../App';
import Toast from "react-native-toast-message";
import {useCart} from "../Context/CartProvider";
import products from "../JsonData/Products";

import {useWishlist} from "../Context/WishlistContext";
import {add} from "react-native/Libraries/Animated/AnimatedExports";
// import { FontAwesome, MaterialIcons  } from '@expo/vector-icons';

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
const carouselItems = [
    {
        title: 'Item 1',
        text: 'Text 1',
        image: { uri: 'https://i.imgur.com/CzXTtJV.jpg' },
    },
    {
        title: 'Item 2',
        text: 'Text 2',
        image: { uri: 'https://i.imgur.com/OB0y6MR.jpg' },
    },
    {
        title: 'Item 3',
        text: 'Text 3',
        image: { uri: 'https://i.imgur.com/2nCt3Sbl.jpg' },
    },
    {
        title: 'Item 4',
        text: 'Text 4',
        image: { uri: 'https://i.imgur.com/lceHsT6l.jpg' },
    },
];

const screenWidth = Dimensions.get('window').width;



 const  HomeScreen=()=> {
    const navigation=useNavigation();
    const { addToWishlist, removeFromWishlist, isInWishlist,wishlist } = useWishlist();
    const { addToCart ,cart,updateQuantity,removeFromCart,getWishlist,getQuantity,addToCarts} = useCart();
    const [modalVisible, setModalVisible] = useState(false);
    // const [wishlist, setWishlist] = useState([]);
    const [quantities, setQuantities] = useState({});
     // const [activeIndex, setActiveIndex] = useState(0);
     const carouselRef = useRef(null);
     const renderItemCorousel = ({ item }) => {
         return (
             <View style={styles.slide}>
                 <Image source={item.image} style={styles.image} />
                 <Text style={styles.title}>{item.title}</Text>
                 <Text>{item.text}</Text>
             </View>
         );
     };

     const screenWidth = Dimensions.get('window').width;
    // State for product quantities (initially 0)
    const [productQuantities, setProductQuantities] = useState(
      products.reduce((acc, product) => {
          acc[product.id] = 0;  // Start all quantities at 0
          return acc;
      }, {})
    );
    const [pendingProduct, setPendingProduct] = useState(null); // to store product temporarily



      // useEffect(() => {
      //   console.log("wishlist updated: ", wishlist);
      // }, [wishlist]);

     const [currentIndex, setCurrentIndex] = useState(0);
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
      const navigateWishlistPage=()=>{
        console.log("Alert wishlist page clicked ");
        navigation.navigate('Wishlist',{HeaderComp:false});
      }

      const handleYes = () => {
        setModalVisible(false);
        Alert.alert('You pressed Yes!');
      };



     const handlequantity = (product, action) => {
         const qty = getQuantity("050a8909-cc49-47e3-ae3e-2ea1faf8ad8f");
         let newQty = qty;
         console.log("new qty "+newQty)
         if   (action === "add") {
             newQty = qty + 1;
             addToCarts("050a8909-cc49-47e3-ae3e-2ea1faf8ad8f", 2);
         } else if (action === "minus") {
             if (qty > 1) {
                 updateQuantity(product, "minus");
             } else {
                 removeFromCart(product.id);
             }
         }
     };
    useEffect(() => {
        console.log(`Pending product for update: ${pendingProduct ? pendingProduct.product.id : 'None'}`);
        console.log(`Pending product for image: ${pendingProduct ? pendingProduct.product.image : 'None'}`);
        if (pendingProduct) {

          const { product, quantity } = pendingProduct;
          console.log("product is "+product.id+" produc img "+product.images)
          addToCart(product, quantity,product.price);
                console.log("produc img "+product.images)
          // setPendingProduct(null); // reset after update
          //   const newPendingProduct = { product, quantity: newQty };
            setPendingProduct(null);
        }
    }, [pendingProduct]);
     const scrollViewRef = useRef(null);
     const [currentScrollX, setCurrentScrollX] = useState(0);
     const [maxScrollX, setMaxScrollX] = useState(0);
     const [activeIndex, setActiveIndex] = useState(0);
     const onScroll = (e) => {
         setCurrentScrollX(e.nativeEvent.contentOffset.x);
     };

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

     const onSeeAlldiscount50 = () => {
         // alert('See All clicked!');
         navigation.navigate('SeeAllProducts', { productsdiscount: products });
     };



     const onSeeAll=()=>{
         alert('See All clicked!');
     }
     const SCREEN_WIDTH = Dimensions.get('window').width;

    // Adjust number of columns here: 2 or 3
     const NUM_COLUMNS = 2;


    // Calculate item width based on number of columns and margin/padding
     const ITEM_MARGIN = 12;
     const ITEM_WIDTH = (SCREEN_WIDTH - ITEM_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;
     // Show only first 2*NUM_COLUMNS products (2 rows)
     const limitedProducts = toppick.slice(0, NUM_COLUMNS * 2);
     const [searchText, setSearchText] = useState('');
     const [profileVisible, setProfileVisible] = useState(false);




     const images = [
         { id: 1, url: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800' },
         { id: 2, url: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800' },
         { id: 3, url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800' },
         { id: 4, url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800' },
     ];
     const renderProductItem = ({ item }) => (
         <View style={[styles.productCardDiscount, { width: ITEM_WIDTH }]}>
             {/* Product image */}
             <Image source={{ uri: item.image }} style={styles.productImageDiscount} />
             {/* Name and price below image */}
             <View style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between',marginVertical:2,paddingVertical:2,paddingHorizontal:7}}>
                 <Text style={styles.productNameDiscount} numberOfLines={1}>
                     {item.name}
                 </Text>
                 <View style={{display:'flex', flexDirection: 'row', gap:'0',paddingHorizontal:6}}>
                     <Text style={styles.originalPrice}>Rs.90</Text>
                     <Text style={styles.discountedPrice}>Rs.45</Text>
                 </View>
             </View>

         </View>
     );

     // const limitedProducts = products.slice(0, 6);
     const data = ['A', 'B', 'C'];
     const renderItem = ({ item }) => {
         // let item;
         const qty = getQuantity("050a8909-cc49-47e3-ae3e-2ea1faf8ad8f");

         return (
             <View style={styles.productCard}>
                 <View style={styles.imageContainer}>
                     <Image source={{uri: item.image}} style={styles.productImage}/>

                     {/* Wishlist icon */}
                     <View style={styles.iconWrapperHeart}>
                         <TouchableOpacity onPress={() => handleWishlist(item)}>
                             <Ionicons
                                 name={wishlist.some(w => w.id === item.id)? "heart" : "heart-outline"}
                                 size={24}
                                 color={wishlist.some(w => w.id === item.id) ? "red" : "gray"}
                             />
                         </TouchableOpacity>
                     </View>

                     {/* Cart control */}
                     <View style={styles.cartControls}>
                         {qty === 0 ? (
                             <TouchableOpacity
                                 style={styles.addButton}
                                 onPress={() => handlequantity(product, "add")}
                             >
                                 <MaterialIcons name="add-shopping-cart" size={18} color="white" />
                                 <Text style={styles.addText}>Add</Text>
                             </TouchableOpacity>
                         ) : (
                             <View style={styles.qtyBox}>
                                 <TouchableOpacity onPress={() => handlequantity(product, "minus")}>
                                     <FontAwesome name="minus" size={14} color="white" />
                                 </TouchableOpacity>
                                 <Text style={styles.qtyText}>{qty}</Text>
                                 <TouchableOpacity onPress={() => handlequantity(product, "add")}>
                                     <FontAwesome name="plus" size={14} color="white" />
                                 </TouchableOpacity>
                             </View>
                         )}
                     </View>
                 </View>

                 {/* Name + Prices */}
                 <View
                     style={{
                         flexDirection: "column",
                         justifyContent: "space-between",
                         marginVertical: 2,
                         paddingVertical: 2,
                         paddingHorizontal: 7,
                     }}
                 >
                     <Text style={styles.productNameDiscount} numberOfLines={1}>
                         {item.name}
                     </Text>
                     <View style={{flexDirection: "row"}}>
                         <Text style={styles.originalPrice}>Rs.90</Text>
                         <Text style={styles.discountedPrice}>Rs.45 </Text>
                     </View>
                 </View>
             </View>
         );
     }

     return (
    // <SafeAreaView style={styles.screenContainer}>
    //   <Text style={styles.screenText}>Home Screen</Text>
    // </SafeAreaView>
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
      <Header  title="Ecommerce App"/>
        <View style={styles.searchSection}>


            <TouchableOpacity style={styles.profileIcon} onPress={() => setProfileVisible(true)}>
                <Ionicons name="person-circle-outline" size={36} color="#333" />
            </TouchableOpacity>
            <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                placeholderTextColor="#777"
                value={searchText}
                onChangeText={setSearchText}
            />
        </View>
        <ScrollView style={styles.scrollSection} contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.carouselWrapper}>
            <Carousel
                width={screenWidth}
                height={220}
                data={images}
                loop
                autoPlay
                autoPlayInterval={2000}
                scrollAnimationDuration={1000}
                onSnapToItem={index => setCurrentIndex(index)}
                pagingEnabled
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 60,
                }}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.url }} style={styles.imageCarousel} />
                )}
            />

            {/* Pagination */}
            <View style={styles.dotContainer}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>


          <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Hot Deals Products</Text>
              <TouchableOpacity onPress={onSeeAll}>
                  <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
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
                  {toppick.map((product) => {
                      // const quantity = productQuantities[product.id];
                      const qty = getQuantity("050a8909-cc49-47e3-ae3e-2ea1faf8ad8f");
                      return(
                          <View key={product.id} style={styles.productCardTopPicks}>
                              <View style={styles.imageContainerTopPicks}>
                                  <Image source={{ uri: product.images}} style={styles.productImage1}  />
                                  {/* Overlay heart and cart quantity controls in top right */}
                                  {/* Icons over image */}

                                  <View style={styles.iconWrappertoppicks}>
                                      {qty === 0 ? (
                                          <TouchableOpacity
                                              style={styles.addButton}
                                              onPress={() => handlequantity(product, "add")}
                                          >
                                              <MaterialIcons name="add-shopping-cart" size={18} color="white" />
                                              <Text style={styles.addText}>Add</Text>
                                          </TouchableOpacity>
                                      ) : (
                                          <View style={styles.qtyBox}>
                                              <TouchableOpacity onPress={() => handlequantity(product, "minus")}>
                                                  <FontAwesome name="minus" size={14} color="white" />
                                              </TouchableOpacity>
                                              <Text style={styles.qtyText}>{qty}</Text>
                                              <TouchableOpacity onPress={() => handlequantity(product, "add")}>
                                                  <FontAwesome name="plus" size={14} color="white" />
                                              </TouchableOpacity>
                                          </View>
                                      )}
                                  </View>
                              </View>
                              {/* Name and price below image */}
                              <View style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between',marginVertical:2,paddingHorizontal:7,}}>
                              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <View>
                                      <Text style={styles.productNameDiscount} numberOfLines={1}>
                                      {product.name}
                                    </Text>
                                  </View>
                                  <View >
                                      {/*<TouchableOpacity style={styles.iconButton}>*/}
                                      {/*    <FontAwesome name="heart" size={20} color="red" />*/}
                                      {/*</TouchableOpacity>*/}
                                      <TouchableOpacity onPress={() => handleWishlist(product)}>
                                          <Ionicons
                                              name={wishlist.some(w => w.id === product.id)? "heart" : "heart-outline"}
                                              size={22}
                                              color={wishlist.some(w => w.id === product.id)? "red" : "gray"}
                                          />
                                      </TouchableOpacity>
                                  </View>
                              </View>
                                  <View style={{display:'flex', flexDirection: 'row', gap:'0',}}>
                                      <Text style={styles.originalPrice}>Rs.90</Text>
                                      <Text style={styles.discountedPrice}>Rs.45</Text>
                                  </View>
                              </View>

                          </View>
                      );
                  })}
              </ScrollView>

              <TouchableOpacity
                  style={styles.rightIconWrapper}
                  onPress={scrollRight}
                  activeOpacity={0.7}
              >
                  <FontAwesome name="angle-right" size={30} color="#999" />
              </TouchableOpacity>
          </View>
          <View>
              {/*  Most Used Products Header */}
              <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>Most Used Products</Text>
                  <TouchableOpacity onPress={onSeeAlldiscount50}>
                      <Text style={styles.seeAllText}>See All</Text>
                  </TouchableOpacity>
              </View>

              {/*<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>*/}
                <View style={{backgroundColor:'#B8001F'}}>
                  <FlatList
                      data={limitedProducts}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={renderItem}
                      numColumns={NUM_COLUMNS}
                      columnWrapperStyle={{ justifyContent: "space-between" }}
                      contentContainerStyle={{ paddingBottom: 20 }}
                  />
                </View>
          </View>
          <View>
              {/* New Added Products Header */}
              <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>Newly Added Products</Text>
                  <TouchableOpacity onPress={onSeeAll}>
                      <Text style={styles.seeAllText}>See All</Text>
                  </TouchableOpacity>
              </View>

              {/* Grid of products */}
              <FlatList
                  data={limitedProducts}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                  numColumns={NUM_COLUMNS}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                  contentContainerStyle={{ paddingBottom: 20 }}
              />

          </View>

          {/*Category Grid*/}
          <CategoryGrid  />

            {/*Huge Discount  60% product*/}
            <View>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Huge Discount Products</Text>
                    <TouchableOpacity onPress={onSeeAll}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                {/* Grid of products */}
                <FlatList
                    data={limitedProducts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    numColumns={NUM_COLUMNS}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

            </View>
            {/* Products grid */}
              <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>All Products</Text>
              </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>

                {products.map((product) => {
                    const qty = getQuantity("050a8909-cc49-47e3-ae3e-2ea1faf8ad8f");

                    return (
                        <View key={product.id} style={styles.productCard}>
                            {/* --- Product Image + Overlay Icons --- */}
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: product.imageurl }} style={styles.productImage} />

                                {/* Heart Icon (Wishlist) */}
                                <TouchableOpacity
                                    style={styles.iconHeart}
                                    onPress={() => handleWishlist(product)}
                                >
                                    <Ionicons
                                        name={
                                            wishlist.some(w => w.id === product.id)
                                                ? "heart"
                                                : "heart-outline"
                                        }
                                        size={22}
                                        color={wishlist.some(w => w.id === product.id) ? "red" : "#555"}
                                    />
                                </TouchableOpacity>

                                {/* Cart Quantity Controls */}
                                <View style={styles.cartControls}>
                                    {qty === 0 ? (
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={() => handlequantity(product, "add")}
                                        >
                                            <MaterialIcons name="add-shopping-cart" size={18} color="white" />
                                            <Text style={styles.addText}>Add</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={styles.qtyBox}>
                                            <TouchableOpacity onPress={() => handlequantity(product, "minus")}>
                                                <FontAwesome name="minus" size={14} color="white" />
                                            </TouchableOpacity>
                                            <Text style={styles.qtyText}>{qty}</Text>
                                            <TouchableOpacity onPress={() => handlequantity(product, "add")}>
                                                <FontAwesome name="plus" size={14} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>

                            {/* --- Product Details --- */}
                            <View style={styles.infoBox}>
                                <Text style={styles.productName} numberOfLines={1}>
                                    {product.name}
                                </Text>
                                <Text style={styles.priceText}>₹ {product.price}</Text>
                            </View>
                        </View>
                    );

                })}
            </View>
      </ScrollView>
        <Modal
            animationType="slide"
            transparent={true}
            visible={profileVisible}
            onRequestClose={() => setProfileVisible(false)}
        >
            <TouchableOpacity
                style={styles.drawerOverlay}
                activeOpacity={1}
                onPressOut={() => setProfileVisible(false)}
            >
                <Animated.View style={styles.drawerContainer}>
                    <View style={styles.drawerHeader}>
                        <Ionicons name="person-circle" size={60} color="gray" />
                        <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 5 }}>John Doe</Text>
                        <Text style={{ fontSize: 14, color: 'gray' }}>johndoe@example.com</Text>
                    </View>

                    <View style={styles.drawerBody}>
                        <TouchableOpacity style={styles.drawerItem}>
                            <Ionicons name="cart-outline" size={22} color="#333" />
                            <Text style={styles.drawerText}>My Orders</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.drawerItem} onPress={()=>navigateWishlistPage()}>
                            <Ionicons name="heart-outline" size={22} color="#333" />
                            <Text style={styles.drawerText}>Wishlist</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.drawerItem}>
                            <Ionicons name="log-out-outline" size={22} color="#333" />
                            <Text style={styles.drawerText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Modal>

        {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 20, fontSize: 18 }}>Are you sure want to confirm?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%', padding: 10 }}>
              <TouchableOpacity
                onPress={handleYes}
                style={{
                  width: '45%',
                  borderRadius: 30,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  width: '45%',
                  borderRadius: 30,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* <BottomBar /> */}
        <Toast />
      <StatusBar style="auto" />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    searchInput: {
        flex: 0.85,
        backgroundColor: '#f2f2f2',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 45,
        fontSize: 16,
    },
    profileIcon: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    drawerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
    },
    drawerContainer: {
        width: '75%',
        backgroundColor: '#fff',
        height: '100%',
        paddingTop: 60,
        paddingHorizontal: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    drawerHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    drawerBody: {
        gap: 20,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    drawerText: {
        fontSize: 16,
        fontWeight: '500',
    },
  container: {
    flex: 1,
    backgroundColor: '#F7F9F2',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: "lightgreen",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white"
  },
  scrollSection: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  // productCard: {
  //   width: '48%',
  //   backgroundColor: '#f2f2f2',
  //   borderRadius: 10,
  //   marginBottom: 15,
  //     // borderColor:'2px solid blue',
  //
  // },
  //   s,m
    productCardTopPicks: {
        width: '11%',
        backgroundColor: '#F7F9F2',
        borderRadius: 10,
        // marginBottom: 15,
        marginHorizontal:4,
        height:150,
        // borderWidth:1,
        // borderColor: 'gray',
        shadowColor: '#121',
        shadowOffset: { width: 9, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        // Optional elevation (Android)
        elevation: 5,

    },
    imageContainerTopPicks:{
        position: "relative",
        width: "100%",
        height: 100,
        backgroundColor: "#f9f9f9",

    },
  // productImage: {
  //   width: "100%",
  //   height: 120,
  //   borderRadius: 10,
  //   marginBottom: 8,
  // },
    productImage1: {
        width: "100%",
        height: '100%',
        objectFit:'fill',
        borderRadius: 15,

    },
  // productName: {
  //   fontSize: 14,
  //   elevation:3,
  //   color: '#333',
  // },
  productFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  // priceText: {
  //   // fontWeight: 'b',
  //   color: '#388e3c',
  //   fontSize: 14,
  // },
  // cartSection: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  qtyBtn: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 2,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // qtyText: {
  //   fontSize: 16,
  //   marginHorizontal: 4,
  // },
  cartIconBtn: {
    backgroundColor: 'green',
    borderRadius: 15,
    padding: 6,
    marginLeft: 6,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  bottomItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 5
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 4,
  },

cartSection: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,   
},
  heartIcon: {
  position: 'absolute',
  top: 0,
  right: 8,
  // padding: 6,
  zIndex: 1,
},
  namePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
   screenText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRightIcons: {
  position: 'absolute',
  top: 5,
  right: 0,
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 2,
},
cartSectionSmall: {
  // flexDirection: 'row',
  // alignItems: 'center',
  // marginLeft: 8,
  // marginBottom:8
    position: 'absolute',
  top:30,
  right: 0,
  bottom: 0,
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 2,
  },
qtyBtnSmall: {
  backgroundColor: '#e0e0e0',
  borderRadius: 10,
  paddingHorizontal: 5,
  paddingVertical: 1,
  marginHorizontal: 3,
  marginBottom: 2,
},
qtyTextSmall: {
  fontSize: 14,
  marginHorizontal: 2,
},
namePriceRatingRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 8,
},
ratingHeartRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

    //Update product
    card: {
        width: '45%',
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        overflow: 'hidden',
        elevation: 4,
    },
    // imageContainer: {
    //     position: 'relative',
    // },
    image: {
        width: '100%',
        height: 150,
    },
    images: {
        width: '10%',
        height: '50%',
        borderColor:'red',
        objectFit: 'fill',
    },
    // iconWrapper: {
    //   position: 'absolute',
    //   right: 10,
    //   top: 10,
    //   alignItems: 'center',
    // },
    // iconButton: {
    //   backgroundColor: '#fff',
    //   padding: 6,
    //   borderRadius: 20,
    //   marginBottom: 10,
    //   elevation: 2,
    // },
    title: {
        padding: 10,
        fontSize: 16,
        fontWeight: '600',
    },
    iconWrapperheartTopPicks: {
        position: 'absolute',
        right: 10,
        top: 0,
        alignItems: 'center',

    },
    iconWrapperHeart:{
        position: 'absolute',
        right: 10,
        top: 3,
        alignItems: 'center',
    },
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
    iconWrappertop:{
        position: 'absolute',

        bottom:0,
        right:10,
        alignItems: 'center',
    },
    iconButton: {
        backgroundColor: '#fff',
        padding: 0,
        borderRadius: 20,
        marginBottom: 10,
        elevation: 2,
    },
    cartControlTopPicks: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 5,
        paddingVertical: 7,
        borderRadius: 10,
        elevation: 2,
        gap: 15,
        marginBottom:5
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
    // qtyText: {
    //     fontSize: 14,
    //     fontWeight: 'bold',
    //     color:"white"
    // },
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

    //Toop picks
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 3,
        // backgroundColor:"#FA7070",
        padding:5,
        borderRadius:10,
        paddingHorizontal:15,
        paddingVertical:5,
        // borderBottomWidth:1,
        // borderBottomColor: '#000',
        shadowColor: '#F6F5F2',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,

        // Shadow for Android
        elevation: 7,
    },
    headerTitle: {
        fontSize: 20,
        fontStyle:'normal',
        fontWeight:600,
        // fontWeight: 'bold',
        // backgroundColor:"#",
        // color:'white'
    },
    seeAllText: {
        fontSize: 15,
        fontWeight:400,
        textDecorationLine:'underline',

        color: 'black',
    },
    logoScrollWrapper: {
        position: 'relative',
    },
    logoScrollContainer: {
        paddingVertical: 10,
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
    // 500% discount style
    flatListContainer: {
      // backgroundColor:"red",
        paddingHorizontal: "auto",
    },
    productCardDiscount: {
        marginLeft: 'auto',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',

        // Optional shadow (iOS)
        shadowColor: '#121',
        shadowOffset: { width: 9, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,

        // Optional elevation (Android)
        elevation: 5,
    },
    productImageDiscount: {
        width: '100%',
        height: 90,
        resizeMode: 'cover',
    },
    productNameDiscount: {
        fontWeight: '600',
        fontSize: 14,
        // marginTop: 8,
        // paddingVertical: 4,
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


    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000',
    },
    imageCorousel:{
        width: screenWidth - 40,
        height: 220,
        borderRadius: 12
    },
paginationContainer: {
    flexDirection: 'row',
        marginTop: 10,
},


    carouselWrapper: {
        alignItems: 'center',
        marginTop: 10,
    },
    imageCarousel: {
        width: screenWidth - 20,
        height: 220,
        borderRadius: 14,
        resizeMode: 'cover',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        backgroundColor: '#f2f2f2',
    },
    dotContainer: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 6,
        justifyContent: 'center',
    },
    dot: {
        width: 7,
        height: 7,
        backgroundColor: '#ccc',
        borderRadius: 50,
    },
    activeDot: {
        width: 8,
        height: 8,
        backgroundColor: '#111',
    },








    productCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 8,
        width: "45%", // for grid layout (2 per row)
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 3,
        overflow: "hidden",
    },

    imageContainer: {
        position: "relative",
        width: "100%",
        height: 150,
        backgroundColor: "#f9f9f9",
    },

    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    // Wishlist heart (top-right)
    iconHeart: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: 20,
        padding: 4,
    },

    // Add / Qty control (bottom-right over image)
    cartControls: {
        position: "absolute",
        bottom: 8,
        right: 8,
        alignItems: "flex-end",
    },

    addButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "red",
        borderWidth: 1,
        borderColor: "#F5F7F8",
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },

    addText: {
        color: "white",
        fontWeight: "600",
        marginLeft: 4,
    },

    qtyBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "red",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        minWidth: 80,
    },

    qtyText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        marginHorizontal: 6,
    },

    // Product info area
    infoBox: {
        paddingHorizontal: 10,
        paddingVertical: 8,
    },

    productName: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },

    priceText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#111",
    },
});
export default HomeScreen;







//    //add or remove items in cart and add item in cart
//     const handlequantity = (product, action) => {
//       console.log(`Product ${product.id} action: ${action}`);
//       const price =90;
//         setProductQuantities(prevQuantities => {
//             const currentQty = prevQuantities[product.id] || 0;
//             console.log("CUrrentqty "+currentQty);
//             let newQty = currentQty;
//             if (action === 'add') {
//                 newQty = currentQty + 1;
//             } else if (action === 'minus' && currentQty > 0) {
//                 newQty = currentQty - 1;
//             }
//             console.log("qty "+newQty)
//
//             const newres= setPendingProduct({ product, quantity: newQty });
//             console.log("qty "+newres);
//             return { ...prevQuantities, [product.id]: newQty };
//         });
//
//       // setQuantities(prev => {
//       //   const currentQty = prev[product.id] || 0;
//       //   // console.log("Current quantity:  of prod "+product.id+" qty currentQty"+currentQty);
//
//       //   let newQty = action === 'add' ? currentQty + 1 : Math.max(0, currentQty - 1);
//       //     // console.log("Current quantity:  of prod "+product.id+" qty update currentQty"+newQty);
//       //   // addToCart(product,newQty);
//       //   setPendingProduct({ product, quantity: newQty });
//
//       // return { ...prev, [product.id]: newQty };
//       // });
//
//
//   // console.log(" Quantities "+quantities.id+" name "+quantities.name)
// };


