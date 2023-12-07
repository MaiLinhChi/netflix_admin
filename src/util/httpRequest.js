import axios from "axios";
import {
  clearAuthData,
  getLocalStorage,
  goToPage,
  setLocalStorage,
} from "./functions";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const Get = async (url, options = {}) => {
  const res = await httpRequest.get(url, options);
  return res;
};

export const Post = async (url, object, options = {}) => {
  const res = await httpRequest.post(url, object, options);
  return res;
};

export const Put = async (url, object, options = {}) => {
  const res = await httpRequest.put(url, object, options);
  return res;
};

export const Patch = async (url, object, options = {}) => {
  const res = await httpRequest.patch(url, object, options);
  return res;
};

export const Delete = async (url, options = {}) => {
  const res = await httpRequest.delete(url, options);
  return res;
};

httpRequest.interceptors.request.use(
  (config) => {
    const access_token = getLocalStorage("access_token");
    config.headers["Authorization"] = `Bearer ${access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  (response) => {
    if (response.data.accessToken) {
      setLocalStorage("access_token", response.data.accessToken);
    }
    if (response.data.refreshToken) {
      setLocalStorage("refresh_token", response.data.refreshToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 ||
      (error?.response?.status === 403 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;

      const refresh_token = getLocalStorage("refresh_token");
      if (!refresh_token) {
        clearAuthData();
        goToPage("/login");
      }
      try {
        // call api refresh token
        const { data } = await Post("/auth/refresh_token", {
          refreshToken: refresh_token,
        });
        const { newAccessToken, newRefreshToken } = data;
        // set new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // save local
        setLocalStorage("access_token", newAccessToken);
        setLocalStorage("refresh_token", newRefreshToken);
        // handle again
        return httpRequest(originalRequest);
      } catch (error) {
        clearAuthData();
        goToPage("/login");
      }
    }
    alert(error.message);
    return Promise.reject(error);
  }
);
