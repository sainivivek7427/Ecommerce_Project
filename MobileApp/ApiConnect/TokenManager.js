import AsyncStorage from "@react-native-async-storage/async-storage";

class TokenManager {
    static async getAccessToken() {
        return AsyncStorage.getItem("jwtToken");
    }

    static async getRefreshToken() {
        return AsyncStorage.getItem("refreshToken");
    }

    static async saveTokens(access, refresh) {
        console.log("Saving  access tokens", access );
        console.log("Saving refresh token", refresh );
        if (access) await AsyncStorage.setItem("jwtToken", access);
        if (refresh) await AsyncStorage.setItem("refreshToken", refresh);
    }

    static async clearTokens() {

        await AsyncStorage.removeItem("jwtToken");
        await AsyncStorage.removeItem("refreshToken");
                console.log("Clearing tokens");
                console.log("jwtToken after clearing:", await AsyncStorage.getItem("jwtToken"));
                console.log("refreshToken after clearing:", await AsyncStorage.getItem("refreshToken"));
    }
}

export default TokenManager;
