import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const getStorageItem = (key) => {
  try {
    if (Platform.OS === "web") {
      if (typeof localStorage !== "undefined") {
        return localStorage.getItem(key);
      }
    } else {
      return SecureStore.getItem(key);
    }
  } catch (e) {
    console.error("Storage is unavailable:", e);
  }
};

const setStorageItem = (key, value) => {
  try {
    if (Platform.OS === "web") {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } else {
      if (value == null) {
        SecureStore.deleteItem(key);
      } else {
        SecureStore.setItem(key, value);
      }
    }
  } catch (e) {
    console.error("Storage is unavailable:", e);
  }
};

const refreshAccessToken = async () => {
  let accessToken = getStorageItem("AccessToken");
  let refreshToken = getStorageItem("RefreshToken");
  let token;

  axios
    .post(process.env.EXPO_PUBLIC_SECURITY_API_URL + "RefreshToken", refreshToken, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      token = response.data.AccessToken;
      setStorageItem("AccessToken", response.data.AccessToken);
      setStorageItem("RefreshToken", response.data.RefreshToken);
    })
    .catch(() => {
      token = null;
    });
  return token;
};

const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${getStorageItem("AccessToken")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 477 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshAccessToken();

      if (accessToken == null) return Promise.reject(error);

      axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
