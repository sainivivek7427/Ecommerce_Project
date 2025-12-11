import axios from "axios";
import TokenManager from "./tokenManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
    baseURL: "https://localhost:8000/",
});

// ---- Attach Access Token Automatically ----
API.interceptors.request.use(async (config) => {
    const token = await TokenManager.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
API.interceptors.response.use(
    (res) => res,

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refresh = await TokenManager.getRefreshToken();

            if (!refresh) {
                console.log("No refresh token");
                return Promise.reject(error);
            }

            try {
                const res = await axios.post("https://localhost:8080/auth/refresh", {
                    refreshToken: refresh,
                });

                const newAccess = res.data.accessToken;

                await TokenManager.saveTokens(newAccess, refresh);

                API.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
                originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

                return API(originalRequest);
            } catch (refreshErr) {
                console.log("Refresh expired → Logout required.");
                await TokenManager.clearTokens();
            }
        }

        return Promise.reject(error);
    }
);

export default API;
