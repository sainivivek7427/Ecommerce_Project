import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Image ,Alert} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import {Cart} from './Cart';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from './Header'; // Assuming HomeScreen is exported from this file
import BottomBar from '../App'; 

const products = [
  { id: 1, name: 'Apple', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnFoJGb5GxF6lyge8lahGyv_nlQrXameFLsgUJAHrwCS1hDR2WdGZ6Es&s' },
  { id: 2, name: 'Banana', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9dWtB64x2W-vjDvbOa14wop1AXDqvwvArg&s' },
  { id: 3, name: 'Carrot', image: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/10/carrot-juice-1296x728-header.jpg?w=1155&h=1528' },
  { id: 4, name: 'Tomato', image: 'https://via.placeholder.com/100?text=Tomato' },
    { id: 5, name: 'Apple', image: 'https://via.placeholder.com/100?text=Apple' },
  { id: 6, name: 'Banana', image: 'https://via.placeholder.com/100?text=Banana' },
  { id: 7, name: 'Carrot', image: 'https://via.placeholder.com/100?text=Carrot' },
  { id: 8, name: 'Tomato', image: 'https://via.placeholder.com/100?text=Tomato' },
    { id: 9, name: 'Apple', image: 'https://via.placeholder.com/100?text=Apple' },
  { id: 10, name: 'Banana', image: 'https://via.placeholder.com/100?text=Banana' },
  { id: 11, name: 'Carrot', image: 'https://via.placeholder.com/100?text=Carrot' },
  { id: 12, name: 'Tomato', image: 'https://via.placeholder.com/100?text=Tomato' },
    { id: 13, name: 'Apple', image: 'https://via.placeholder.com/100?text=Apple' },
  { id: 14, name: 'Banana', image: 'https://via.placeholder.com/100?text=Banana' },
  { id: 15, name: 'Carrot', image: 'https://via.placeholder.com/100?text=Carrot' },
  { id: 16, name: 'Tomato', image: 'https://via.placeholder.com/100?text=Tomato' },
  // Add more products as needed
];
export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlist, setWishlist] = useState([]);
    // const [wishlist, setcart] = useState([]);

  const handleYes = () => {
    setModalVisible(false);
    Alert.alert('You pressed Yes!');
  };

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
      console.log(`Product ${productId} and product name ${productName} added to wishlist`);
  // console.log("wishlist ",wishlist);
      // You can add your logic here, e.g., API call
};

const [quantities, setQuantities] = useState({});
// const [Cart, setcart] = useState([]);
// const handleQuantity = (product, action) => {
//   setQuantities(prev => {
//     const currentQty = prev[product.id] || 0;
//     let newQty = currentQty;
//     if (action === 'add') {
//       newQty = currentQty + 1;
//     } else if (action === 'minus') {
//       newQty = Math.max(0, currentQty - 1);
//     }
//     setCart(prevCart => addOrUpdateCart(prevCart, product, newQty));
//     return { ...prev, [product.id]: newQty };
//   });
// };

// const handlequantity= (product,action) => { 
//   console.log(`Product ${product.id} action: ${action}`);
//   setQuantities(prev => { 
//     const currentQty = prev[product.id] || 0;
//     if (action === 'add') {
//       return { ...prev, [product.id]: currentQty + 1 };  
//     }
//     else if (action === 'minus') { 
//       return { ...prev, [product.id]: Math.max(0, currentQty - 1) }; // Ensure quantity doesn't go below 0
      
//     }
//     return prev; // No change if action is not recognized or quantity is already 0
//   });
// }



// In your HomeScreen component:
const [cart, setCart] = useState([]);
// function addOrUpdateCart(cart, product, quantity) {
//   const price = 99; // Replace with product.price if available
//   const existing = cart.find(item => item.id === product.id);
//   if (quantity === 0) {
//     // Remove from cart if quantity is 0
//     return cart.filter(item => item.id !== product.id);
//   } else if (existing) {
//     // Update quantity and amount
//     return cart.map(item =>
//       item.id === product.id
//         ? { ...item, quantity, amount: price * quantity }
//         : item
//     );
//   } else {
//     // Add new item
//     return [
//       ...cart,
//       {
//         id: product.id,
//         productname: product.name,
//         price: price,
//         quantity: quantity,
//         amount: price * quantity,
//       },
//     ];
//   }
// }

const handlequantity = (product, action) => {
  console.log(`Product ${product.id} action: ${action}`);
  setQuantities(prev => {
    const currentQty = prev[product.id] || 0;
    let newQty = currentQty;
    if (action === 'add') {
      newQty = currentQty + 1;
    } else if (action === 'minus') {
      newQty = Math.max(0, currentQty - 1);
    }
    setCart(prevCart => addOrUpdateCart(prevCart, product, newQty));
    return { ...prev, [product.id]: newQty };
  });
};
  return (
    // <SafeAreaView style={styles.screenContainer}>
    //   <Text style={styles.screenText}>Home Screen</Text>
    // </SafeAreaView>
    <SafeAreaView style={styles.container}>
      <Header />
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
        {/* Products grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {products.map((product) => (

<View key={product.id} style={styles.productCard}>
  <View style={styles.imageWrapper}>
    <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="cover" />
    {/* Overlay heart and cart quantity controls in top right */}
    <View style={styles.topRightIcons}>
      <TouchableOpacity onPress={() => handleWishlist(product.id, product.name)} style={styles.heartIcon}>
        <Ionicons
          name={wishlist.includes(product.id) ? "heart" : "heart-outline"}
          size={22}
          color={wishlist.includes(product.id) ? "red" : "gray"}
        />
      </TouchableOpacity>
            <View style={styles.cartSectionSmall}>
        <TouchableOpacity style={styles.qtyBtnSmall} onPress={() => handlequantity(product, 'minus')}>
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyTextSmall}>{quantities[product.id] || 0}</Text>
        <TouchableOpacity style={styles.qtyBtnSmall} onPress={() => handlequantity(product, 'add')}>
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  </View>
  {/* Name and price row below image */}
  <View style={{display: 'flex', flexDirection: 'column', width: '100%', marginTop: 8 }}>
    {/* <Text style={styles.productName}>{product.name}</Text>
    <Text style={styles.priceText}>₹99</Text>
     */}
     <View style={{ flex: 1 ,flexDirection: 'row', justifyContent: 'space-between',marginBottom: 4}}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.priceText}>₹99</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
      {/* Example rating: 4 stars */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 6 }}>
        {[...Array(5)].map((_, i) => (
          <Ionicons key={i} name="star" size={16} color="#FFD700" />
        ))}
      </View>
      {/* Heart icon for wishlist (optional, if you want another here) */}
      <TouchableOpacity onPress={() => handleWishlist(product.id, product.name)}>
        <Ionicons
          name={wishlist.includes(product.id) ? "heart" : "heart-outline"}
          size={24}
          color={wishlist.includes(product.id) ? "red" : "gray"}
        />
      </TouchableOpacity>
    </View>
  </View>
</View>
          ))}
        </View>
      </ScrollView>

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
      <StatusBar style="auto" />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
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
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: "100%",
    height: 80,
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
  qtyText: {
    fontSize: 16,
    marginHorizontal: 4,
  },
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
});

