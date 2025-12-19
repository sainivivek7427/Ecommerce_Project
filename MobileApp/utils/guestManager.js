import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import API from "../ApiConnect/apiClient";
class GuestManager {
    static async getOrCreateGuestId() {
        let guest_id = await AsyncStorage.getItem("guest_id");

        if (guest_id==null) {

            guest_id = uuidv4();
            await AsyncStorage.setItem("guest_id", "guest-"+guest_id);
            console.log("Create guest id: guest:"+guest_id);
            return "guest-"+guest_id;
        }
        console.log("guest id from storage:", guest_id);
        return guest_id;
    }

    static async clearGuestId() {
        await AsyncStorage.removeItem("guest_id");
    }

    static async getUserId(){
        let userId = await AsyncStorage.getItem("user_id");
        // if (!userId) {
        //     userId = await AsyncStorage.setItem("user_id","");
        // }

        return userId;

    }
    static async setUserId(userid) {
        try {
            // Check if user_id already exists
            let userId = await AsyncStorage.getItem("user_id");

            if (userId==null) {
                // Create a new ID
                userId = "user:" + userid;
                await AsyncStorage.setItem("user_id", userId);
            }

            // Return user id
            return userId;

        } catch (error) {
            console.error("Error setting user ID:", error);
            return null;
        }
    }
    static async getCartId(){
        let cartId = await AsyncStorage.getItem("cart_id");


        return cartId;

    }
    static async setcartId(cartid) {
        try {
            // Check if user_id already exists
            let cartId = await AsyncStorage.getItem("cart_id");

            if (cartId==null) {
                // Create a new ID
                // userId = "user:" + cartid;
                await AsyncStorage.setItem("cart_id", cartid);
            }

            // Return user id
            return cartid;

        } catch (error) {
            console.error("Error setting user ID:", error);
            return null;
        }
    }
    static async clearUserId() {
        await AsyncStorage.removeItem("user_id");
    }
}

export default GuestManager;
