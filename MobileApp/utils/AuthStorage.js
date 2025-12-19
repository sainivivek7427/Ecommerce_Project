import AsyncStorage from "@react-native-async-storage/async-storage";
import GuestManager from "./guestManager";

class AuthStorage {

    static async initLoginState() {
        const login = await AsyncStorage.getItem("login");
        if (login === null) {
            await AsyncStorage.setItem("login", "false");
            return false;
        }
        return login === "true";
    }

    static async isLoggedIn() {
        return (await AsyncStorage.getItem("login")) === "true";
    }

    static async setLoggedIn() {
        await AsyncStorage.setItem("login", "true");
    }

    static async logout() {
        await AsyncStorage.setItem("login", "false");
    }
}
export default AuthStorage;
