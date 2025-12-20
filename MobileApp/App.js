
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
import AuthStorage from "./utils/AuthStorage";
import TokenManager from "./ApiConnect/TokenManager";
import axios from "axios";
import API from "./ApiConnect/apiClient";
import tokenManager from "./ApiConnect/TokenManager"; // Assuming TabNavigator is exported from this file
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
        const checkAndFetchGuestToken = async () => {
            const existingAccessToken = await TokenManager.getAccessToken();

            if (existingAccessToken) {
                console.log("Access token already exists"+existingAccessToken);
                console.log("refresh token already exists"+await tokenManager.getRefreshToken());
                return;
            }

            const guestId = await guestManager.getOrCreateGuestId();
            console.log('Fetching guest token for guest ID:', guestId);

            try {
                const response = await API.post(
                    '/auth/login-guest',
                    null,
                    {
                        params: { guestId },
                        skipAuth: true   // ✅ MUST be inside SAME config object
                    }
                );

                const { token, refreshToken } = response.data;
                await TokenManager.saveTokens(token, refreshToken);

                console.log('Guest tokens saved successfully!');
            } catch (error) {
                console.error('Failed to fetch guest token:', error);
                throw error; // 👈 important for debugging
            }
        };


        const createCart = async () => {
            const guestId = await guestManager.getOrCreateGuestId();
            console.log('Creating cart for guest ID:', guestId);

            try {
                const response = await API.post(
                    '/cart/init',
                    null,
                    {
                        headers: {
                            'X-GUEST-ID': guestId
                        },
                        // skipAuth: true   // ✅ REQUIRED
                    }
                );

                await guestManager.setcartId(response.data.id);
                console.log('Guest cart created:', response.data.id);
            } catch (error) {
                console.error('Failed to create cart:', error);
                throw error;
            }
        };
        const initCart = async () => {
            const isLoggedIn = await AuthStorage.isLoggedIn();

            if (isLoggedIn) {
                console.log("User already logged in → skip guest flow");
                return;
            }

            console.log("User not logged in → guest flow");

            console.log("➡️ calling checkAndFetchGuestToken");
            await checkAndFetchGuestToken();
            if(await guestManager.getCartId()==null){
                console.log("➡️ calling createCart");
                await createCart();

            }
            console.log("already created guest cart id ")

            console.log("✅ guest cart init completed");
        };
        // TokenManager.clearTokens();
        initCart();
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