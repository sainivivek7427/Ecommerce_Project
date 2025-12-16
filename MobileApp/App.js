
import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView, Image ,Alert} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Toast from "react-native-toast-message";
import { CartProvider } from './Context/CartProvider';
import TabNavigator from './components/TabNavigator';
import {WishlistProvider} from "./Context/WishlistContext";
import HomeStackNavigator from "./Navigator/HomeStackNavigator";
import guestManager from "./utils/guestManager";
import TokenManager from "./ApiConnect/TokenManager";
import axios from "axios";
import API from "./ApiConnect/apiClient"; // Assuming TabNavigator is exported from this file
// function BottomBar() {
//   return (
//     <View style={styles.bottomBar}>
//       <View style={styles.bottomItem}>
//         <Ionicons name="home" size={24} color="white" />
//         <Text style={styles.bottomText}>Home</Text>
//       </View>
//       <View style={styles.bottomItem}>
//         <MaterialIcons name="category" size={24} color="white" />
//         <Text style={styles.bottomText}>Categories</Text>
//       </View>
//       <View style={styles.bottomItem}>
//         <FontAwesome name="user" size={24} color="white" />
//         <Text style={styles.bottomText}>Login</Text>
//       </View>
//       <View style={styles.bottomItem}>
//         <Ionicons name="person-circle" size={24} color="white" />
//         <Text style={styles.bottomText}>Profile</Text>
//       </View>
//     </View>
//   );
// }



export default function App() {
    useEffect(() => {
        const initializeUserId = async () => {
            try {
                // Check if user_id exists in AsyncStorage
                const userid=await guestManager.getUserId();
                console.log("set userid", userid);

            } catch (error) {
                console.error("Error initializing user ID:", error);
            }
        };
        const checkAndFetchGuestToken = async () => {
            // Check if a guest token already exists
            const existingAccessToken = await TokenManager.getAccessToken();

            if (!existingAccessToken) {
                // No access token found, so we need to get a new guest token
                const guestId = await guestManager.getGuestId(); // You can generate this or use some persistent ID
                console.log('Fetching guest token for guest ID:', guestId);
                try {
                    const response = await API.post('/auth/login-guest', null, {
                                                        params: { guestId }
                                                        },
                                                        { skipAuth: true });

                    const { token, refreshToken } = response.data;

                    // Save the new guest tokens
                    await TokenManager.saveTokens(token, refreshToken);

                    console.log('Guest tokens saved successfully!');
                } catch (error) {
                    console.error('Failed to fetch guest token:', error);
                    console.error('Error details:', error.response ? error.response.data : error.message);

                }
            } else {
                console.log('Access token already exists, no need to fetch a new one.');
            }
        };

        // Call the function on app load
        guestManager.clearUserId();
        TokenManager.clearTokens();
        initializeUserId();
        checkAndFetchGuestToken();
    }, []);
  return (
      <CartProvider>
          <WishlistProvider>
    <NavigationContainer>
      <HomeStackNavigator />
        <Toast />
      <StatusBar style="auto" />
    </NavigationContainer>
          </WishlistProvider>
      </CartProvider>

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