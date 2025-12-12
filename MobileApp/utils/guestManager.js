import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
class GuestManager {
    static async getGuestId() {
        let guest_id = await AsyncStorage.getItem("guest_id");

        if (!guest_id) {

            guest_id = uuidv4();
            await AsyncStorage.setItem("guest_id", "guest-"+guest_id);
        }

        return guest_id;
    }

    static async clearGuestId() {
        await AsyncStorage.removeItem("guest_id");
    }

    static async getUserId(){
        let userId = await AsyncStorage.getItem("user_id");
        if (!userId) {
            userId = await AsyncStorage.setItem("user_id","");
        }

        return userId;

    }
    static async setUserId() {
        try {
            // Check if user_id already exists
            let userId = await AsyncStorage.getItem("user_id");

            if (!userId) {
                // Create a new ID
                userId = "user-" + uuidv4();
                await AsyncStorage.setItem("user_id", userId);
            }

            // Return user id
            return userId;

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
