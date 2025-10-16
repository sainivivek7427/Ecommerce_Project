import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect, useRef,} from 'react';
import {
    SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions,
    ScrollView, Image, Alert, FlatList, TextInput, Animated
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import CategoryGrid  from "./CategoryGrid";

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from './Header'; // Assuming HomeScreen is exported from this file
import BottomBar from '../App';
import Toast from "react-native-toast-message";
import {useCart} from "../Context/CartProvider";
// import { FontAwesome, MaterialIcons  } from '@expo/vector-icons';
const products = [
  { id: 1, name: 'Apple', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnFoJGb5GxF6lyge8lahGyv_nlQrXameFLsgUJAHrwCS1hDR2WdGZ6Es&s',price:'90' },
  { id: 2, name: 'Banana', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg',price:'90' },
  { id: 3, name: 'Carrot', image: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/10/carrot-juice-1296x728-header.jpg?w=1155&h=1528',price:'90' },
  { id: 4, name: 'Tomato', image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',price:'90' },
    { id: 5, name: 'Apple', image: 'https://via.placeholder.com/100?text=Apple',price:'90' },
  { id: 6, name: 'Banana', image: 'https://via.placeholder.com/100?text=Banana' ,price:'90'},
  { id: 7, name: 'Carrot', image: 'https://via.placeholder.com/100?text=Carrot' ,price:'90'},
  { id: 8, name: 'Tomato', image: 'https://via.placeholder.com/100?text=Tomato' ,price:'90'},
    { id: 9, name: 'Apple', image: 'https://via.placeholder.com/100?text=Apple' ,price:'90'},
  { id: 10, name: 'Banana', image: 'https://via.placeholder.com/100?text=Banana' ,price:'90'},
  { id: 11, name: 'Carrot', image: 'https://via.placeholder.com/100?text=Carrot' ,price:'90'},
  { id: 12, name: 'Tomato', image: 'https://via.placeholder.com/100?text=Tomato' ,price:'90'},
    { id: 13, name: 'Apple', image: 'https://via.placeholder.com/100?text=Apple' ,price:'90'},
  { id: 14, name: 'Banana', image: 'https://via.placeholder.com/100?text=Banana' ,price:'90'},
  { id: 15, name: 'Carrot', image: 'https://via.placeholder.com/100?text=Carrot' ,price:'90'},
  { id: 16, name: 'Tomato', image: 'https://via.placeholder.com/100?text=Tomato' ,price:'90'},
  // Add more products as needed
];

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

 const  HomeScreen=()=> {
  const { addToCart ,cart,updateQuantity,removeFromCart} = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [quantities, setQuantities] = useState({});

    // State for product quantities (initially 0)
  const [productQuantities, setProductQuantities] = useState(
      products.reduce((acc, product) => {
          acc[product.id] = 0;  // Start all quantities at 0
          return acc;
      }, {})
  );
  const [pendingProduct, setPendingProduct] = useState(null); // to store product temporarily



  useEffect(() => {
    console.log("wishlist updated: ", wishlist);
  }, [wishlist]);

  const handleWishlist = (productId,productName) => {
    console.log(`Toggling wishlist for product ID: ${productId}, Name: ${productName}`);
      setWishlist((prev) =>
        prev.includes(productId)
          ? prev.filter(id => id !== productId)
          : [...prev, productId]

      );
      //Api call
      console.log(`Product ${productId} and product name ${productName} added to wishlist`);

    };

    const handleYes = () => {
        setModalVisible(false);
        Alert.alert('You pressed Yes!');
    };

     // helper function to get product quantity from context
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
     const navigation = useNavigation();
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

     const renderItem = ({ item }) => {
         // let item;
         const qty = getQuantity(item.id);

         return (
             <View style={styles.productCard}>
                 <View style={styles.imageContainer}>
                     <Image source={{uri: item.image}} style={styles.productImage}/>

                     {/* Wishlist icon */}
                     <View style={styles.iconWrapperHeart}>
                         <TouchableOpacity onPress={() => handleWishlist(item.id, item.name)}>
                             <Ionicons
                                 name={wishlist.includes(item.id) ? "heart" : "heart-outline"}
                                 size={24}
                                 color={wishlist.includes(item.id) ? "red" : "gray"}
                             />
                         </TouchableOpacity>
                     </View>

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
                         {item.name}
                     </Text>
                     <View style={{flexDirection: "row", paddingHorizontal: 6}}>
                         <Text style={styles.originalPrice}>Rs.90</Text>
                         <Text style={styles.discountedPrice}>Rs.45</Text>
                     </View>
                 </View>
             </View>
         );
     }

         return (
    // <SafeAreaView style={styles.screenContainer}>
    //   <Text style={styles.screenText}>Home Screen</Text>
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
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
        <View style={{ flexDirection: 'row', width: '100%', marginBottom: 10 }}>
          <TouchableOpacity style={{ flex: 1, marginRight: 5 }} onPress={() => setModalVisible(true)}>
            <Text style={{
              backgroundColor: "skyblue",
              padding: 10,
              borderRadius: 30,
              textAlign: "center",
              color: "white",
            }}>
              Hello World
            </Text>
          </TouchableOpacity>
          <Text style={{
            backgroundColor: "lightgreen",
            color: "white",
            textAlign: "center",
            padding: 10,
            borderRadius: 20,
            flex: 1,
            marginLeft: 5
          }}>
            Success page
          </Text>
        </View>

          <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Top Picks</Text>
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
                      const qty = getQuantity(product.id);
                      return(
                          <View key={product.id} style={styles.productCardTopPicks}>
                              <View style={styles.imageContainer}>
                                  <Image source={{ uri: product.images}} style={styles.productImage1}  />
                                  {/* Overlay heart and cart quantity controls in top right */}
                                  {/* Icons over image */}

                                  <View style={styles.iconWrappertoppicks}>
                                      {qty === 0 ? (
                                          <TouchableOpacity style={styles.addtoCart} onPress={() => handlequantity(product, 'add')}>
                                              <MaterialIcons name="add" size={12} color="red" />
                                              <Text style={{color:"red"}}>Add</Text>
                                          </TouchableOpacity>
                                      ) : (
                                          <View style={styles.cartControlTopPicks}>
                                              <TouchableOpacity onPress={() => handlequantity(product, 'minus')}>
                                                  <FontAwesome name="minus" size={14} color="white"  />
                                              </TouchableOpacity>

                                              <Text style={{fontSize:14}}>{qty}</Text>

                                              <TouchableOpacity onPress={() => handlequantity(product, 'add')}>
                                                  <FontAwesome name="plus" size={14} color="white"  />
                                              </TouchableOpacity>
                                          </View>
                                      )}
                                  </View>

                              </View>
                              {/* Name and price below image */}
                              <View style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-between',marginVertical:2,paddingVertical:2,paddingHorizontal:7}}>
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
                                      <TouchableOpacity onPress={() => handleWishlist(product.id, product.name)}>
                                          <Ionicons
                                              name={wishlist.includes(product.id) ? "heart" : "heart-outline"}
                                              size={22}
                                              color={wishlist.includes(product.id) ? "red" : "gray"}
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
              {/*  Top 40% discount Header */}
              <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>Discount 40% Products</Text>
                  <TouchableOpacity onPress={onSeeAlldiscount50}>
                      <Text style={styles.seeAllText}>See All</Text>
                  </TouchableOpacity>
              </View>

              {/*<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>*/}
                  <FlatList
                      data={limitedProducts}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={renderItem}
                      numColumns={NUM_COLUMNS}
                      columnWrapperStyle={{ justifyContent: "space-between" }}
                      contentContainerStyle={{ paddingBottom: 20 }}
                  />
          </View>
          <View>
              {/* Header */}
              <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>Discount 50% Products</Text>
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
          {/*60% product*/}
          <View>
              {/* Header */}
              <View style={styles.headerContainer}>
                  <Text style={styles.headerTitle}>Discount 60% Products</Text>
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
        {/* Products grid */}
          <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>All Products</Text>
          </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {products.map((product) => {
              const quantity = productQuantities[product.id];

              return(
              <View key={product.id} style={styles.productCard}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage}  />
                {/* Overlay heart and cart quantity controls in top right */}
                  {/* Icons over image */}
                  <View style={styles.iconWrapperHeart}>
                      {/*<TouchableOpacity style={styles.iconButton}>*/}
                      {/*    <FontAwesome name="heart" size={20} color="red" />*/}
                      {/*</TouchableOpacity>*/}
                      <TouchableOpacity onPress={() => handleWishlist(product.id, product.name)}>
                          <Ionicons
                              name={wishlist.includes(product.id) ? "heart" : "heart-outline"}
                              size={24}
                              color={wishlist.includes(product.id) ? "red" : "gray"}
                          />
                      </TouchableOpacity>
                  </View>
                  <View style={styles.iconWrapper}>
                      {quantity === 0 ? (
                          <TouchableOpacity style={styles.addtoCart} onPress={() => handlequantity(product, 'add')}>
                              <MaterialIcons name="add" size={20} color="red" />
                              <Text style={{color:"red"}}>Add</Text>
                          </TouchableOpacity>
                      ) : (
                          <View style={styles.cartControl}>
                              <TouchableOpacity onPress={() => handlequantity(product, 'minus')}>
                                  <FontAwesome name="minus" size={18} color="white"  />
                              </TouchableOpacity>

                              <Text style={styles.qtyText}>{quantity}</Text>

                              <TouchableOpacity onPress={() => handlequantity(product, 'add')}>
                                  <FontAwesome name="plus" size={18} color="white"  />
                              </TouchableOpacity>
                          </View>
                      )}
                  </View>
               
              </View>
                <View style={{ flex: 1 ,flexDirection: 'row', justifyContent: 'space-between',marginBottom: 4,paddingHorizontal:10}}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.priceText}>₹99</Text>
                </View>
                {/*<Text style={styles.title}>title</Text>*/}
              {/*/!* Name and price row below image *!/*/}
              {/*<View style={{display: 'flex', flexDirection: 'column', width: '100%', marginTop: 8 }}>*/}
                {/* <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.priceText}>₹99</Text>
                 */}

              {/*  <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>*/}
              {/*    /!* Example rating: 4 stars *!/*/}
              {/*    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 6 }}>*/}
              {/*      {[...Array(5)].map((_, i) => (*/}
              {/*        <Ionicons key={i} name="star" size={16} color="#FFD700" />*/}
              {/*      ))}*/}
              {/*    </View>*/}
              {/*    /!* Heart icon for wishlist (optional, if you want another here) *!/*/}
              {/*    <TouchableOpacity onPress={() => handleWishlist(product.id, product.name)}>*/}
              {/*      <Ionicons*/}
              {/*        name={wishlist.includes(product.id) ? "heart" : "heart-outline"}*/}
              {/*        size={24}*/}
              {/*        color={wishlist.includes(product.id) ? "red" : "gray"}*/}
              {/*      />*/}
              {/*    </TouchableOpacity>*/}
              {/*  </View>*/}
              {/*</View>*/}
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

                        <TouchableOpacity style={styles.drawerItem}>
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
    backgroundColor: '#fff',
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
  productCard: {
    width: '48%',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 15,
      // borderColor:'2px solid blue',

  },
    productCardTopPicks: {
        width: '10%',
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
        marginBottom: 15,
        marginHorizontal:3


    },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
    productImage1: {
        width: "100%",
        height: 60,
        objectFit:'fill',
        borderRadius: 10,
        marginBottom: 8,
    },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  priceText: {
    fontWeight: 'bold',
    color: '#388e3c',
    fontSize: 16,
  },
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
    imageContainer: {
        position: 'relative',
    },
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
    qtyText: {
        fontSize: 14,
        fontWeight: 'bold',
        color:"white"
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

    //Toop picks
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


