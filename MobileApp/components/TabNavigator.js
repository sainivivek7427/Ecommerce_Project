// // import { useCart } from './../Context/CartProvider';
// import { StatusBar } from 'expo-status-bar';
// import React, { useState ,useEffect} from 'react';
// import { SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Image ,Alert} from 'react-native';
// import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
// // import {Cart} from './Cart';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './HomeScreen'; // Assuming HomeScreen is exported from this file
// // import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
// // import { addOrUpdateCart } from './CartUtil'; // Assuming you have a utility function to handle cart updates
//
// import Header from './Header'; // Assuming CartScreen is exported from this file
// import LoginScreen from './LoginScreen'; // Assuming LoginScreen is exported from this file
// import Toast from "react-native-toast-message";
// import {useCart} from "./../Context/CartProvider";
// import CartScreen from './CartScreen'; // Assuming CartScreen is exported from this file
// // import { CartProvider } from './../AppContext/CartProvider';
// import CategoriesScreen from './CategoriesScreen';
// import HomeStackNavigator from "../Navigator/HomeStackNavigator"; // Assuming CategoriesScreen is exported from this file
// const Tab=createBottomTabNavigator();
// const TabNavigator = () => {
//   const { getCartItemCount } = useCart(); // ✅ Safe here
//   const cartCount = getCartItemCount();
//
//   return (
//     <Tab.Navigator
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarStyle: styles.bottomBar,
//           tabBarIcon: ({ color, size }) => {
//             if (route.name === 'Home') {
//               return <Ionicons name="home" size={size} color={color} />;
//             } else if (route.name === 'Categories') {
//               return <MaterialIcons name="category" size={size} color={color} />;
//             } else if (route.name === 'Cart') {
//               return <FontAwesome name="shopping-cart" size={size} color={color} />;
//             } else if (route.name === 'Login') {
//               return <Ionicons name="person-circle" size={size} color={color} />;
//             }
//           },
//           tabBarActiveTintColor: 'white',
//           tabBarInactiveTintColor: '#e0e0e0',
//         })}
//       >
//         <Tab.Screen name="Home" component={HomeStackNavigator} />
//         <Tab.Screen name="Categories" component={CategoriesScreen} />
//         <Tab.Screen name="Cart" component={CartScreen} options={{
//             tabBarBadge:cartCount > 0 ? cartCount : null // Display cart item count as badge
//         }}   />
//         <Tab.Screen name="Login" component={LoginScreen} />
//       </Tab.Navigator>
//   );
// };
// export default TabNavigator;
//
// export const styles = StyleSheet.create({
//   bottomBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: 'lightgreen',
//     height: 60,
//     width: '100%',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     elevation: 10,
//       paddingBottom:35
//   }
// });


import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import CategoriesScreen from "./CategoriesScreen";
import CartScreen from "./CartScreen";
import LoginScreen from "./LoginScreen";
import {useCart} from "../Context/CartProvider";
import {createStackNavigator} from "@react-navigation/stack";
import AddressScreen from "./AddressScreen";
import CheckoutScreen from "./CheckoutScreen";
import ProductDescrption from "./ProductDescrption";
import WishlistScreen from "./WishlistScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CartStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/*<Stack.Screen name="CartMain" component={CartScreen} />*/}
            <Stack.Screen name="CartPage" component={CartScreen}  options={{title:" Cart Items"}}/>
            <Stack.Screen name="AddressScreen" component={AddressScreen} options={{title:"Delivery Address"}} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
            <Stack.Screen name="ProductDescription" component={ProductDescrption} options={{ title: 'Product' }} />

        </Stack.Navigator>
    );
}

export default function TabNavigator() {

      const { getCartItemCount } = useCart(); // ✅ Safe here
  const cartCount = getCartItemCount();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { backgroundColor: "#333" },
                tabBarIcon: ({ color, size }) => {
                    if (route.name === "Home") {
                        return <Ionicons name="home" size={size} color={color} />;
                    } else if (route.name === "Categories") {
                        return <MaterialIcons name="category" size={size} color={color} />;
                    } else if (route.name === "Cart") {
                        return <FontAwesome name="shopping-cart" size={size} color={color} />;
                    } else if (route.name === "Login") {
                        return <Ionicons name="person-circle" size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#aaa",
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            {/*<Tab.Screen name="Categories" component={CategoriesScreen} />*/}
            <Tab.Screen name="Cart" component={CartStack} options={{
                tabBarBadge:cartCount > 0 ? cartCount : null}}  />
            <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Navigator>
    );
}

