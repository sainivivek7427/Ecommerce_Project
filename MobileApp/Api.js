import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: "http://192.168.29.35:8080/api",
});

// Add Authorization header to every request
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle expired access token (401 error)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem("refreshToken");

                const res = await axios.post("http://192.168.29.35:8080/api/auth/refresh-token", {
                    refreshToken,
                });

                const newAccessToken = res.data.token;
                await AsyncStorage.setItem("accessToken", newAccessToken);

                // Update Authorization header
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                // Optionally log out user here
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
