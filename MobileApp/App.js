// import { StatusBar } from 'expo-status-bar';
// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity, Button,Alert } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Image ,Alert} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import {Cart} from './Cart';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen'; // Assuming HomeScreen is exported from this file
// import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import { addOrUpdateCart } from './CartUtil'; // Assuming you have a utility function to handle cart updates

import Header from './components/Header'; // Assuming CartScreen is exported from this file
import LoginScreen from './components/LoginScreen'; // Assuming LoginScreen is exported from this file
import Toast from "react-native-toast-message";
import {CartProvider,useCart} from "./Context/CartProvider";

function BottomBar() {
  return (
    <View style={styles.bottomBar}>
      <View style={styles.bottomItem}>
        <Ionicons name="home" size={24} color="white" />
        <Text style={styles.bottomText}>Home</Text>
      </View>
      <View style={styles.bottomItem}>
        <MaterialIcons name="category" size={24} color="white" />
        <Text style={styles.bottomText}>Categories</Text>
      </View>
      <View style={styles.bottomItem}>
        <FontAwesome name="user" size={24} color="white" />
        <Text style={styles.bottomText}>Login</Text>
      </View>
      <View style={styles.bottomItem}>
        <Ionicons name="person-circle" size={24} color="white" />
        <Text style={styles.bottomText}>Profile</Text>
      </View>
    </View>
  );
}

// function HomeScreen() {
//    }
function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.screenText}>Categories Screen</Text>
    </SafeAreaView>
  );
}
function CartScreen() {
    const { cart, addToCart, getCartItemCount } = useCart();
    // const total = cart.reduce((sum, item) => sum + item.amount, 0);
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.screenText}>Cart Screen</Text>
      <ScrollView>
        {cart.length === 0 ? (
          <Text>No items in cart.</Text>
        ) : (
          cart.map(item => (
            <View  style={{ marginBottom: 10 }}>
              {/*<Text>{item.name} - Qty: {item.quantity} - ₹{item.price} each</Text>*/}
              <Text>Total: Cart Items: {getCartItemCount()}</Text>
            </View>
          ))
        )}
        {/*<Text style={{ fontWeight: 'bold', marginTop: 20 }}>Grand Total: ₹{total}</Text>*/}
      </ScrollView>
    </SafeAreaView>
  );
}
// function LoginScreen() {
//   return (
//     <SafeAreaView style={styles.screenContainer}>
//       <Text style={styles.screenText}>Login Screen</Text>
//     </SafeAreaView>
//   );
// }
const Tab=createBottomTabNavigator();

export default function App() {
 

  return (
      <CartProvider>
    <NavigationContainer>
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.bottomBar,
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') {
              return <Ionicons name="home" size={size} color={color} />;
            } else if (route.name === 'Categories') {
              return <MaterialIcons name="category" size={size} color={color} />;
            } else if (route.name === 'Cart') {
              return <FontAwesome name="shopping-cart" size={size} color={color} />;
            } else if (route.name === 'Login') {
              return <Ionicons name="person-circle" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#e0e0e0',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Cart" component={CartScreen} options={{
            tabBarBadge:3
        }}   />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
        <Toast />
      <StatusBar style="auto" />
    </NavigationContainer>
      </CartProvider>

  );
}
// // Cart Badge component to display the number of items in the cart
// const CartBadge = () => {
//     const { getCartItemCount } = useCart();
//     const itemCount = getCartItemCount();
//     return itemCount > 0 ? itemCount : 0;
// };

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