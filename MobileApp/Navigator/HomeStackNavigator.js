// HomeStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import SeeAllProductsScreen from './SeeAllProductsScreen';
import HomeScreen from "../components/HomeScreen";
import SeeAllProductsScreen from "../components/SeeAllProductsScreen";
import CategoryDetail from "../components/CategoryDetail";
import ProductDescrption from "../components/ProductDescrption";
import WishlistScreen from "../components/WishlistScreen";
import CartScreen from "../components/CartScreen";
import CheckoutScreen from "../components/CheckoutScreen";
import AddressScreen from "../components/AddressScreen";
import TabNavigator from "../components/TabNavigator";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeMain" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="SeeAllProducts" component={SeeAllProductsScreen} options={{ title: 'All Products' }} />
            <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
            <Stack.Screen name="ProductDescription" component={ProductDescrption} options={{ title: 'Product' }} />
            <Stack.Screen name="Wishlist" component={WishlistScreen} />
            <Stack.Screen name="CartPage" component={CartScreen} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} options={{title:"Delivery Addresss",headerShown: false }} />
        </Stack.Navigator>
    );
}