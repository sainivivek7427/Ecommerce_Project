// import axios from "axios";
// import TokenManager from "./TokenManager";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const API = axios.create({
//     baseURL: "https://localhost:8080/",
// });

// // ---- Attach Access Token Automatically ----
// API.interceptors.request.use(async (config) => {
//     const token = await TokenManager.getAccessToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
// API.interceptors.response.use(
//     (res) => res,

//     async (error) => {
//         const originalRequest = error.config;

//             if (error.response?.status === 401 && !originalRequest._retry) {
//                 originalRequest._retry = true;

//                 const refresh = await TokenManager.getRefreshToken();

//                 if (!refresh) {
//                     console.log("No refresh token");
//                     return Promise.reject(error);
//                 }

//                 try {
//                     const res = await axios.post("https://localhost:8080/auth/refresh", {
//                         refreshToken: refresh,
//                     });

//                     const newAccess = res.data.accessToken;

//                     await TokenManager.saveTokens(newAccess, refresh);

//                     API.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
//                     originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

//                     return API(originalRequest);
//                 } catch (refreshErr) {
//                     console.log("Refresh expired → Logout required.");
//                     await TokenManager.clearTokens();
//                 }
//             }

//             else if (error.response?.status === 400 && !originalRequest._retry) {
//                 originalRequest._retry = true;

//                 const refresh = await TokenManager.getRefreshToken();

//                 if (!refresh) {
//                     console.log("No refresh token");
//                     return Promise.reject(error);
//                 }

//                 try {
//                     const res = await axios.post("https://localhost:8080/auth/refresh-guest", {
//                         refreshToken: refresh,
//                     });

//                     const newAccess = res.data.accessToken;

//           const API = axios.create({
//     baseURL: "https://localhost:8000/",
// });

// // ---- Attach Access Token Automatically ----
// API.interceptors.request.use(async (config) => {
//     const token = await TokenManager.getAccessToken();
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
// API.interceptors.response.use(
//     (res) => res,

//     async (error) => {
//         const originalRequest = error.config;

//             if (error.response?.status === 401 && !originalRequest._retry) {
//                 originalRequest._retry = true;

//                 const refresh = await TokenManager.getRefreshToken();

//                 if (!refresh) {
//                     console.log("No refresh token");
//                     return Promise.reject(error);
//                 }

//                 try {
//                     const res = await axios.post("https://localhost:8080/auth/refresh", {
//                         refreshToken: refresh,
//                     });

//                     const newAccess = res.data.accessToken;

//                     await TokenManager.saveTokens(newAccess, refresh);

//                     API.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
//                     originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

//                     return API(originalRequest);
//                 } catch (refreshErr) {
//                     console.log("Refresh expired → Logout required.");
//                     await TokenManager.clearTokens();
//                 }
//             }

//             else if (error.response?.status === 400 && !originalRequest._retry) {
//                 originalRequest._retry = true;

//                 const refresh = await TokenManager.getRefreshToken();

//                 if (!refresh) {
//                     console.log("No refresh token");
//                     return Promise.reject(error);
//                 }

//                 try {
//                     const res = await axios.post("https://localhost:8080/auth/refresh-guest", {
//                         refreshToken: refresh,
//                     });

//                     const newAccess = res.data.accessToken;

//                     await TokenManager.saveTokens(newAccess, refresh);

//                     API.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
//                     originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

//                     return API(originalRequest);
//                 } catch (refreshErr) {
//                     console.log("Refresh expired → Logout required.");
//                     await TokenManager.clearTokens();
//                 }
//             }

//         return Promise.reject(error);
//     }
// );
//           await TokenManager.saveTokens(newAccess, refresh);

//                     API.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
//                     originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

//                     return API(originalRequest);
//                 } catch (refreshErr) {
//                     console.log("Refresh expired → Logout required.");
//                     await TokenManager.clearTokens();
//                 }
//             }

//         return Promise.reject(error);
//     }
// );

// export default API;


// import axios from "axios";
// import TokenManager from "./TokenManager";
// import TokenStorage from "./TokenManager";
// import {getMetroSourceType} from "babel-preset-expo/build/common";
//
// const API = axios.create({
//     baseURL: "http://192.168.29.35:8080/",
//     timeout: 15000,
// });
//
// // ---- Attach Access Token Automatically ----
// API.interceptors.request.use(async (config) => {
//         console.log("skipAuth =", config.skipAuth, "url =", config.url);
//
//         if (config.skipAuth) return config;
//         console.log("skipAuth =", config.skipAuth, "url =", config.url);
//         const token = await TokenStorage.getAccessToken();
//
//         if (token) {
//             config.headers = config.headers || {};
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//
//         config.headers["Content-Type"] = "application/json";
//         console.log("➡️ API CALL:", config.url);
//
//         return config;
//     },
//     (error) => Promise.reject(error));
//
// // ---- Handle 401 and 400 Responses ----
// const handleAuthError = async (error) => {
//     const originalRequest = error.config;
//
//     if (originalRequest._retry) return Promise.reject(error); // Prevent infinite retry loops
//
//     originalRequest._retry = true;
//     const refresh = await TokenManager.getRefreshToken();
//
//     if (!refresh) {
//         console.log("No refresh token");
//         return Promise.reject(error);
//     }
//
//     try {
//         let res;
//         if (error.response?.status === 401) {
//             // Token expired, try to refresh
//             res = await axios.post("https://192.168.29.35:8080/auth/refresh", {
//                 refreshToken: refresh,
//             });
//         } else if (error.response?.status === 406) {
//             // Handle the 400 case (for guests)
//             res = await axios.post("https://192.168.29.35:8080/auth/refresh-guest", {
//                 refreshToken: refresh,
//             });
//         }
//
//         const newAccess = res.data.accessToken;
//         await TokenManager.saveTokens(newAccess, refresh);
//
//         API.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
//         originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
//
//         return API(originalRequest);
//     } catch (refreshErr) {
//         console.log("Refresh expired → Logout required."+refreshErr.message);
//
//         await TokenManager.clearTokens();
//         return Promise.reject(refreshErr);
//     }
// };
//
// API.interceptors.response.use(
//     (res) => res,
//     (error) => {
//         const url = error.config?.url;
//
//         if (
//             !error.config?.skipAuth &&
//             [401, 400].includes(error.response?.status)
//         ) {
//             return handleAuthError(error);
//         }
//
//         return Promise.reject(error);
//     }
//
// );
//
// export default API;

import axios from "axios";
import TokenManager from "./TokenManager";
import TokenStorage from "./TokenManager";
import guestManager from "../utils/guestManager";

const API = axios.create({
    baseURL: "http://192.168.29.35:8080/",
    timeout: 15000,
});

// ---- Attach Access Token Automatically ----
API.interceptors.request.use(
    async (config) => {
        console.log("skipAuth =", config.skipAuth, "url =", config.url);

        if (config.skipAuth) return config;

        const token = await TokenStorage.getAccessToken();

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers["Content-Type"] = "application/json";
        console.log("➡️ API CALL:", config.url);

        return config;
    },
    (error) => Promise.reject(error)
);

// ---- Handle 401 / 400 ----
// res.data.accessToken = undefined;
const handleAuthError = async (error) => {
    const originalRequest = error.config;

    if (originalRequest._retry) return Promise.reject(error);
    originalRequest._retry = true;

    const refresh = await TokenManager.getRefreshToken();
    if (!refresh) return Promise.reject(error);

    try {
        let res;

        if (error.response?.status === 401) {
            res = await axios.post(
                "http://192.168.29.35:8080/auth/refresh",
                { refreshToken: refresh }
            );
        } else if (error.response?.status === 406) {
            const guestUserId=await guestManager.getOrCreateGuestId();
            console.log("status 406 "+error.response.status);
            res = await axios.post(
                "http://192.168.29.35:8080/auth/refresh-guest",
                { refreshToken: refresh },{skipAuth: true}
            );
        }
        console.log("value "+res.data.accessToken)
        const newAccess = res.data.accessToken;
        await TokenManager.saveTokens(newAccess, refresh);

        API.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return API(originalRequest);
    } catch (e) {
        await TokenManager.clearTokens();
        return Promise.reject(e);
    }
};

API.interceptors.response.use(
    (res) => res,
    (error) => {
        if (
            !error.config?.skipAuth &&
            [401, 400, 406].includes(error.response?.status)
        ) {
            return handleAuthError(error);
        }
        return Promise.reject(error);
    }
);

export default API;
