// HomeStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import SeeAllProductsScreen from './SeeAllProductsScreen';
import HomeScreen from "../components/HomeScreen";
import SeeAllProductsScreen from "../components/SeeAllProductsScreen";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SeeAllProducts" component={SeeAllProductsScreen} options={{ title: 'All Products' }} />
        </Stack.Navigator>
    );
}