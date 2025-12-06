import AsyncStorage from "@react-native-async-storage/async-storage";

class TokenManager {
    static async getAccess() {
        return AsyncStorage.getItem("jwtToken");
    }

    static async getRefresh() {
        return AsyncStorage.getItem("refreshToken");
    }

    static async saveTokens(access, refresh) {
        if (access) await AsyncStorage.setItem("jwtToken", access);
        if (refresh) await AsyncStorage.setItem("refreshToken", refresh);
    }

    static async clearTokens() {
        await AsyncStorage.removeItem("jwtToken");
        await AsyncStorage.removeItem("refreshToken");
    }
}

export default TokenManager;
