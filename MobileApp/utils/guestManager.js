import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
class GuestManager {
    static async getGuestId() {
        let guest_id = await AsyncStorage.getItem("guest_id");

        if (!guest_id) {

            guest_id = uuidv4();
            await AsyncStorage.setItem("guest_id", guest_id);
        }

        return g;
    }

    static async clearGuestId() {
        await AsyncStorage.removeItem("guest_id");
    }
}

export default GuestManager;
